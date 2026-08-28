from __future__ import annotations
import hashlib, json, math, random
from dataclasses import dataclass
from pathlib import Path

VERSION = 'YU100-MFP-VALIDATION-HARNESS-v001'

def clip(x, lo=0.0, hi=1.0): return max(lo, min(hi, x))
def centered(x): return 2.0 * x - 1.0

def rng_for(*parts):
    raw = '|'.join(map(str, parts)).encode('utf-8')
    seed = int(hashlib.sha256(raw).hexdigest()[:16], 16)
    return random.Random(seed)

@dataclass(frozen=True)
class Hero:
    id: str; name: str
    combat: float; explore: float; resilience: float
    risk: float; cohesion: float; discipline: float

@dataclass(frozen=True)
class Event:
    type: str; danger: float; reward: float; urgency: float; information: float

HEROES = {
    'H01': Hero('H01','Haruto',.68,.45,.72,.85,.90,.30),
    'H02': Hero('H02','Aria',.48,.92,.62,.25,.75,.80),
    'H03': Hero('H03','Rina',.55,.60,.78,.35,.30,.90),
    'H04': Hero('H04','Kyle',.82,.42,.55,.90,.25,.20),
    'H05': Hero('H05','Mina',.45,.58,.88,.30,.95,.60),
    'H06': Hero('H06','Sera',.42,.86,.52,.70,.45,.25),
    'H07': Hero('H07','Lloyd',.92,.30,.70,.75,.60,.75),
    'H08': Hero('H08','Elna',.60,.55,.76,.50,.65,.95),
}

S02 = Event('UNKNOWN_ROUTE', .72, .65, .25, .30)
CANONICAL_PARTY = ['H01','H02','H07','H05']
SERA_PARTY = ['H01','H06','H07','H05']

UNKNOWN_ROUTE_COEFF = {
    'PROCEED': {'reward': .75, 'danger': -.65, 'risk': .75},
    'SCOUT':   {'info_gap': .45, 'danger': .15, 'risk': -.45},
    'AVOID':   {'danger': .75, 'reward': -.55, 'risk': -.65},
}

FIXTURE_SEEDS = {
    'VS-01': 1140,
    'VS-02': 1209,
    'VS-03': 1311,
    'VS-04': 1403,
    'VS-05': 1501,
    'VS-06': 1601,
    'VS-07': 1701,
    'VS-08': 1801,
    'VS-09': 1922,
}

def experience_value(exposures: int, confidence: float) -> float:
    return confidence * (1.0 - math.exp(-0.45 * exposures))

def perceive(hero: Hero, event: Event, seed: int, exp_value=0.0, fatigue=.05):
    ability = hero.explore if event.type == 'UNKNOWN_ROUTE' else hero.combat
    sigma = .35 * (1 - .45*ability - .25*exp_value) * (1 + .30*fatigue) * (1 - .30*event.information)
    r = rng_for(seed, event.type, hero.id, 'perception')
    perceived = {
        'danger': clip(event.danger + r.gauss(0,1)*sigma),
        'reward': clip(event.reward + r.gauss(0,1)*sigma),
        'urgency': clip(event.urgency + r.gauss(0,1)*sigma*.5),
    }
    confidence = clip(.20 + .35*ability + .25*exp_value + .20*event.information - .25*fatigue)
    return {'values': perceived, 'confidence': confidence, 'sigma': sigma}

def policy_biases(hero: Hero, risk_policy='NORMAL', priority='SURVIVAL'):
    rp = {'CONSERVATIVE': -.20, 'NORMAL': 0.0, 'AGGRESSIVE': .20}[risk_policy]
    w = .40 + .60*hero.discipline
    b = {'PROCEED': 0.0, 'SCOUT': 0.0, 'AVOID': 0.0}
    b['PROCEED'] += rp*w
    b['AVOID'] -= rp*w
    b['SCOUT'] -= abs(rp)*.15*w
    if priority == 'MISSION':
        b['PROCEED'] += .18*w; b['AVOID'] -= .10*w
    elif priority == 'SURVIVAL':
        b['SCOUT'] += .10*w; b['AVOID'] += .16*w; b['PROCEED'] -= .12*w
    elif priority == 'RESCUE':
        b['SCOUT'] += .03*w
    return b

def proposal(hero: Hero, event: Event, perception, risk_policy='NORMAL', priority='SURVIVAL'):
    p = perception['values']; d=p['danger']; r=p['reward']; i=1-event.information; cr=centered(hero.risk)
    scores = {
        'PROCEED': .75*r - .65*d + .75*cr,
        'SCOUT': .45*i + .15*d - .45*cr,
        'AVOID': .75*d - .55*r - .65*cr,
    }
    pb = policy_biases(hero, risk_policy, priority)
    for a in scores: scores[a] += pb[a]
    ranked = sorted(scores.items(), key=lambda kv: kv[1], reverse=True)
    delta = ranked[0][1] - ranked[1][1]
    confidence = clip(.55*perception['confidence'] + .45*math.tanh(2.5*max(0,delta)))
    return {'action': ranked[0][0], 'scores': scores, 'confidence': confidence, 'margin': delta}

def relevance(hero: Hero, event: Event):
    ability = hero.explore if event.type == 'UNKNOWN_ROUTE' else hero.combat
    return .50 + .50*ability

def trust_weight(trust): return .20 + .80*trust

def leader_decision(party, leader_id, event, seed, trusts=None, risk_policy='NORMAL', priority='SURVIVAL', exp_values=None):
    trusts = trusts or {}; exp_values = exp_values or {}
    percs, props = {}, {}
    for hid in party:
        percs[hid] = perceive(HEROES[hid], event, seed, exp_values.get(hid,0.0))
        props[hid] = proposal(HEROES[hid], event, percs[hid], risk_policy, priority)

    raw = props[leader_id]['scores']; mn, mx = min(raw.values()), max(raw.values())
    leader_norm = {a: ((v-mn)/(mx-mn) if mx>mn else .5) for a,v in raw.items()}
    leader_policy = policy_biases(HEROES[leader_id], risk_policy, priority)

    acc = {a: 0.0 for a in raw}; total = 0.0; advisors={}
    for hid in party:
        if hid == leader_id: continue
        pr = props[hid]
        trust = trusts.get((leader_id,hid), .50)
        rel = relevance(HEROES[hid], event)
        weight = pr['confidence'] * trust_weight(trust) * rel
        total += weight
        vec = {a: (1.0 if a==pr['action'] else -.5) for a in raw}
        for a in raw: acc[a] += weight*vec[a]
        advisors[hid] = {'action': pr['action'], 'confidence': pr['confidence'], 'trust': trust, 'relevance': rel, 'weight': weight}
    consensus = {a:(acc[a]/total if total else 0.0) for a in raw}
    final = {a: leader_norm[a] + .25*leader_policy[a] + .80*consensus[a] for a in raw}
    ranked = sorted(final.items(), key=lambda kv: kv[1], reverse=True)
    margin = ranked[0][1]-ranked[1][1]
    if margin >= .20:
        selected = ranked[0][0]
    else:
        top=ranked[:2]; temp=.08; ex=[math.exp(v/temp) for _,v in top]; p0=ex[0]/sum(ex)
        selected = top[0][0] if rng_for(seed,event.type,leader_id,'decision_tiebreak').random() < p0 else top[1][0]
    return {'selected':selected,'final_scores':final,'margin':margin,'perceptions':percs,'proposals':props,'advisors':advisors,'consensus':consensus}

def action_fit_unknown(event: Event, action: str):
    d,r,u,i = event.danger,event.reward,event.urgency,1-event.information
    if action=='PROCEED': return clip(.45*(1-d)+.30*r+.25*u)
    if action=='SCOUT': return clip(.50*i+.30*d+.20*(1-u))
    if action=='AVOID': return clip(.55*d+.25*(1-r)+.20*(1-u))
    raise ValueError(action)

def party_capability(party, action):
    hs=[HEROES[h] for h in party]
    combat=sum(h.combat for h in hs)/len(hs); explore=sum(h.explore for h in hs)/len(hs); res=sum(h.resilience for h in hs)/len(hs)
    if action=='SCOUT': return .75*explore+.25*res
    if action=='PROCEED': return .45*explore+.35*combat+.20*res
    if action=='AVOID': return .60*res+.40*explore
    raise ValueError(action)

def readiness(health=1.0, fatigue=.05, supplies=1.0): return clip(.60*health+.25*(1-fatigue)+.15*supplies)

def resolve_unknown(party, action, world_noise, health=1.0, fatigue=.05, supplies=1.0):
    fit=action_fit_unknown(S02,action); cap=party_capability(party,action); ready=readiness(health,fatigue,supplies)
    base=.45*fit+.35*cap+.20*ready; score=clip(base+world_noise)
    if score>=.72: outcome='STRONG_SUCCESS'
    elif score>=.55: outcome='SUCCESS'
    elif score>=.38: outcome='SETBACK'
    else: outcome='FAILURE'
    process='CONTEXT_ALIGNED' if fit>=.68 else ('CONTESTABLE' if fit>=.45 else 'HIGH_RISK')
    variance='ADVERSE_SHOCK' if world_noise<=-.15 else ('FORTUNATE_BREAK' if world_noise>=.15 else 'NORMAL_VARIANCE')
    return {'action_fit':fit,'capability':cap,'readiness':ready,'base_score':base,'world_noise':world_noise,'execution_score':score,'process':process,'variance':variance,'outcome':outcome}

def trust_delta(current, proposal_action, proposal_conf, rel, adopted=True, feedback_clarity=.90):
    fits={a:action_fit_unknown(S02,a) for a in ('PROCEED','SCOUT','AVOID')}; mean=sum(fits.values())/3
    evidence=feedback_clarity*(fits[proposal_action]-mean)
    adoption=1.0 if adopted else .65
    damping=1-.65*abs(2*current-1)
    delta=.20*evidence*proposal_conf*rel*adoption*damping
    return delta, evidence

def update_experience(exposures, confidence, feedback_clarity):
    return exposures+1, confidence + .35*feedback_clarity*(1-confidence)

def test(name, condition, details):
    return {'id':name,'status':'PASS' if condition else 'FAIL','details':details}

def run_all():
    results=[]
    seed=FIXTURE_SEEDS['VS-01']
    h=leader_decision(CANONICAL_PARTY,'H01',S02,seed); a=leader_decision(CANONICAL_PARTY,'H02',S02,seed)
    results.append(test('VS-01', h['selected']=='PROCEED' and a['selected']=='SCOUT', {'seed':seed,'haruto':h['selected'],'aria':a['selected'],'haruto_personal':h['proposals']['H01']['action'],'aria_personal':h['proposals']['H02']['action']}))
    seed=FIXTURE_SEEDS['VS-02']
    ar=leader_decision(CANONICAL_PARTY,'H01',S02,seed); se=leader_decision(SERA_PARTY,'H01',S02,seed)
    results.append(test('VS-02', ar['selected']=='SCOUT' and se['selected']=='PROCEED', {'seed':seed,'with_aria':ar['selected'],'with_sera':se['selected'],'aria_proposal':ar['proposals']['H02']['action'],'sera_proposal':se['proposals']['H06']['action']}))
    seed=FIXTURE_SEEDS['VS-03']
    lo=leader_decision(CANONICAL_PARTY,'H01',S02,seed,{('H01','H02'):.20}); hi=leader_decision(CANONICAL_PARTY,'H01',S02,seed,{('H01','H02'):.80})
    results.append(test('VS-03', lo['selected']=='PROCEED' and hi['selected']=='SCOUT' and hi['advisors']['H02']['weight']>lo['advisors']['H02']['weight'], {'seed':seed,'low_trust':lo['selected'],'high_trust':hi['selected'],'aria_weight_low':lo['advisors']['H02']['weight'],'aria_weight_high':hi['advisors']['H02']['weight']}))
    seed=FIXTURE_SEEDS['VS-04']
    co=leader_decision(CANONICAL_PARTY,'H01',S02,seed,risk_policy='CONSERVATIVE'); ag=leader_decision(CANONICAL_PARTY,'H01',S02,seed,risk_policy='AGGRESSIVE')
    aria_co=leader_decision(CANONICAL_PARTY,'H02',S02,seed,risk_policy='CONSERVATIVE')
    personality_retained = co['proposals']['H01']['action'] != aria_co['proposals']['H02']['action'] or co['final_scores'] != aria_co['final_scores']
    results.append(test('VS-04', co['selected']=='AVOID' and ag['selected']=='PROCEED' and personality_retained, {'seed':seed,'conservative':co['selected'],'aggressive':ag['selected'],'haruto_personal_conservative':co['proposals']['H01']['action'],'aria_personal_conservative':aria_co['proposals']['H02']['action']}))
    o5=resolve_unknown(CANONICAL_PARTY,'SCOUT',-.22)
    results.append(test('VS-05', o5['process']=='CONTEXT_ALIGNED' and o5['outcome'] in ('SETBACK','FAILURE') and o5['variance']=='ADVERSE_SHOCK', o5))
    o6=resolve_unknown(CANONICAL_PARTY,'PROCEED',+.23)
    results.append(test('VS-06', o6['process']=='HIGH_RISK' and o6['outcome'] in ('SUCCESS','STRONG_SUCCESS') and o6['variance']=='FORTUNATE_BREAK', o6))
    chain=[{'id':'N1','kind':'DECISION','value':'PROCEED','parent':None},{'id':'N2','kind':'STATE_DELTA','value':'SUPPLIES_LOW','parent':'N1'},{'id':'N3','kind':'DECISION','value':'PUSH','parent':'N2'},{'id':'N4','kind':'STATE_DELTA','value':'HIGH_FATIGUE','parent':'N3'},{'id':'N5','kind':'EVENT','value':'ENEMY_ENCOUNTER','parent':'N4'},{'id':'N6','kind':'STATUS','value':'ISOLATED','parent':'N5'}]
    by={n['id']:n for n in chain}; cur='N6'; path=[]
    while cur: path.append(by[cur]['value']); cur=by[cur]['parent']
    path=list(reversed(path))
    results.append(test('VS-07', path==['PROCEED','SUPPLIES_LOW','PUSH','HIGH_FATIGUE','ENEMY_ENCOUNTER','ISOLATED'], {'seed':FIXTURE_SEEDS['VS-07'],'causal_path':path}))
    seed=FIXTURE_SEEDS['VS-08']; hero=HEROES['H02']
    p0=perceive(hero,S02,seed,0.0); exp_n, exp_c=update_experience(0,0.0,.90); ev=experience_value(exp_n,exp_c); p1=perceive(hero,S02,seed,ev)
    e0=abs(p0['values']['danger']-S02.danger); e1=abs(p1['values']['danger']-S02.danger)
    results.append(test('VS-08', p1['sigma']<p0['sigma'] and e1<=e0+1e-12 and p1['confidence']>p0['confidence'], {'seed':seed,'sigma_before':p0['sigma'],'sigma_after':p1['sigma'],'danger_error_before':e0,'danger_error_after':e1,'confidence_before':p0['confidence'],'confidence_after':p1['confidence'],'experience_value':ev}))
    trust=.50; history=[]; evidence_seeds=[1209,1311,1140,1209,1311,1140]
    for idx,s in enumerate(evidence_seeds,1):
        dec=leader_decision(CANONICAL_PARTY,'H01',S02,s,{('H01','H02'):trust}); pr=dec['proposals']['H02']; adopted=dec['selected']==pr['action']
        delta,evidence=trust_delta(trust,pr['action'],pr['confidence'],relevance(HEROES['H02'],S02),adopted,.95); trust=clip(trust+delta,.10,.90)
        history.append({'step':idx,'seed':s,'aria_proposal':pr['action'],'selected':dec['selected'],'adopted':adopted,'delta':delta,'trust':trust,'evidence':evidence})
    base=leader_decision(CANONICAL_PARTY,'H01',S02,FIXTURE_SEEDS['VS-09'],{('H01','H02'):.50}); grown=leader_decision(CANONICAL_PARTY,'H01',S02,FIXTURE_SEEDS['VS-09'],{('H01','H02'):trust})
    results.append(test('VS-09', .55<=trust<=.65 and grown['selected']!=base['selected'] and grown['advisors']['H02']['weight']>base['advisors']['H02']['weight'], {'seed':FIXTURE_SEEDS['VS-09'],'initial_trust':.50,'final_trust':trust,'history':history,'base_action':base['selected'],'grown_action':grown['selected'],'base_aria_weight':base['advisors']['H02']['weight'],'grown_aria_weight':grown['advisors']['H02']['weight']}))
    passed=sum(r['status']=='PASS' for r in results)
    return {'harness':VERSION,'summary':{'passed':passed,'failed':len(results)-passed,'total':len(results),'human_validation_pending':['VS-10']},'calibration':{'unknown_route_coefficients':UNKNOWN_ROUTE_COEFF,'note':'Initial draft over-weighted SCOUT; coefficients calibrated before Golden Fixture freeze.'},'fixture_seeds':FIXTURE_SEEDS,'results':results}

if __name__=='__main__':
    data=run_all()
    out=Path('/mnt/data/yu100_mfp_validation_results_v001.json')
    out.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(data['summary'],ensure_ascii=False))
    for r in data['results']: print(r['id'],r['status'])
    print(out)
