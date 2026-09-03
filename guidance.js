// MFP02.7 actionable guidance layer. Reads existing simulation/diagnostic state only.
// It does not add Outcome modifiers or change decision equations.
const _resolve027=resolve;
resolve=function(party,e,d,seed,st){
  const o=_resolve027(party,e,d,seed,st);
  return {...o,healthBefore:st.health,fatigueBefore:st.fatigue,supplyRatioBefore:st.supplies/100};
};

function eventAbilitySpec(e){
  if(e.t==='UNKNOWN_ROUTE')return {label:'経路把握',axes:[['探索','e',.75],['粘り','r',.25]],context:'未知経路では探索が中心。粘りが補助する。'};
  if(e.t==='ENEMY')return {label:'敵対対応',axes:[['戦闘','c',.70],['粘り','r',.30]],context:'敵集団では戦闘が中心。粘りが補助する。'};
  if(e.t==='INJURY')return {label:'負傷対応',axes:[['粘り','r',1]],context:'負傷局面では粘りを実行能力として扱う。'};
  if(e.t==='STRANDED')return {label:'救助継続',axes:[['粘り','r',1]],context:'遭難者対応では、救助を続けられる余力を粘りで圧縮表現している。'};
  return {label:'消耗耐性',axes:[['粘り','r',1]],context:'物資消耗局面では、消耗下で行動を維持する力を粘りで圧縮表現している。'};
}
function compositeAbility(h,spec){return spec.axes.reduce((z,[,k,w])=>z+h[k]*w,0)}
function avgAxis(r,k){const hs=r.party.map(id=>hero(id));return hs.reduce((z,h)=>z+h[k],0)/hs.length}
function abilitySnapshot(r,x){
  const spec=eventAbilitySpec(x.e),party=r.party.map(id=>hero(id));
  const current=spec.axes.map(([n,k,w])=>`${n}${grade(avgAxis(r,k))}${w<1?`(${Math.round(w*100)}%)`:''}`).join(' / ');
  const weak=[...party].sort((a,b)=>compositeAbility(a,spec)-compositeAbility(b,spec))[0];
  const outside=HEROES.filter(h=>!r.party.includes(h.id)).sort((a,b)=>compositeAbility(b,spec)-compositeAbility(a,spec))[0]||null;
  return {spec,current,weak,outside};
}
function routeCapable(a){return !['AVOID','RETREAT','REPORT'].includes(a)}
function bestRouteAction(x){
  return x.e.a.filter(routeCapable).sort((a,b)=>fit(x.e,b)-fit(x.e,a))[0]||null;
}
function proposerForAction(r,x,a){
  if(!a)return null;
  const hs=r.party.map(id=>hero(id)).filter(h=>x.prs[h.id]?.a===a);
  return hs.sort((p,q)=>ability(q,x.e)-ability(p,x.e))[0]||null;
}
function policyHintForAction(a){
  if(['PROCEED','ENGAGE','CONTINUE','CONTINUE_MISSION','PUSH'].includes(a))return 'Priority: MISSION / Risk: AGGRESSIVE は、この種の前進Actionを直接後押しする。';
  if(a==='SCOUT')return 'Priority: SURVIVAL は偵察を直接後押しする。Risk変更は偵察自体を直接強化しない。';
  if(a==='TREAT')return 'Priority: SURVIVAL または RESCUE は応急処置を直接後押しする。';
  if(a==='RESCUE')return 'Priority: RESCUE は救助を直接後押しする。';
  if(['RETREAT','AVOID','REDUCE'].includes(a))return 'Risk: CONSERVATIVE は温存側Actionを直接後押しする。';
  return 'Policy変更による直接の後押しは限定的。隊長候補の判断傾向を比較する方がよい。';
}
function mostPreservingLeader(){
  return S.sel.map(id=>hero(id)).map(h=>({h,p:averageProfile(leaderPreviewActions(h)).preserve})).sort((a,b)=>b.p-a.p)[0]?.h||null;
}
function readinessWeakness(x){
  const health=x.o.healthBefore??1,fatigue=x.o.fatigueBefore??0,supply=x.o.supplyRatioBefore??1;
  const parts=[
    {k:'health',v:.60*(1-health),label:'負傷・体力'},
    {k:'fatigue',v:.25*fatigue,label:'疲労'},
    {k:'supply',v:.15*(1-supply),label:'携行物資'}
  ].sort((a,b)=>b.v-a.v);
  return parts[0];
}
function leverForCause(r,d){
  if(d.complete)return [];
  if(!d.x)return ['未確立区間へ到達できるだけの遠征余力を確保する。'];
  const x=d.x,best=bestRouteAction(x),proposer=proposerForAction(r,x,best),a=abilitySnapshot(r,x),out=[];
  if(d.primary==='decision'){
    out.push(`このSectorを確立できるActionへ判断を変える。候補: ${best?LABEL[best]:'前進可能Action'}。`);
    if(proposer&&proposer.id!==r.leader)out.push(`隊長候補: ${proposer.n}（実際にこの局面で「${LABEL[best]}」を提案）。`);
    else if(best)out.push(policyHintForAction(best));
  }else if(d.primary==='fit'){
    if(best&&best!==x.d.pick){
      out.push(`この状況では「${LABEL[x.d.pick]}」より「${LABEL[best]}」の方がAction Fitは高い。`);
      if(proposer&&proposer.id!==r.leader)out.push(`比較候補: ${proposer.n}を隊長にする（この局面で「${LABEL[best]}」を提案）。`);
      else out.push(policyHintForAction(best));
    }else{
      out.push('選択Actionだけを替えても改善幅は小さい。能力または遠征余力の補強を優先する。');
      if(a.outside)out.push(`編成比較候補: ${a.weak.n} → ${a.outside.n}（${a.spec.label}の合成能力が現候補で高い）。`);
    }
  }else if(d.primary==='capability'){
    out.push(`不足候補は ${a.spec.axes.map(([n,,w])=>`${n}${w<1?` ${Math.round(w*100)}%`:''}`).join(' + ')}。現編成は ${a.current}。`);
    if(a.outside)out.push(`編成比較候補: ${a.weak.n} → ${a.outside.n}。`);
  }else if(d.primary==='readiness'){
    const w=readinessWeakness(x),p=mostPreservingLeader();
    out.push(`遠征余力の中では「${w.label}」の不足寄与が最大。前半の消耗を抑える。`);
    if(p&&p.id!==r.leader)out.push(`隊長比較候補: ${p.n}（現在メンバー中で温存寄りの運用予測）。`);
    else out.push('Priority: SURVIVAL を維持し、消耗の大きい強行・交戦が続く編成/隊長を避ける。');
  }else if(d.primary==='variance'){
    out.push('今回は現地外乱の寄与が最大。編成や隊長を主因と断定しない。');
    out.push('同程度の条件でも再現するかを見てから、人事変更を判断する。');
  }
  return out.slice(0,2);
}
function abilityCompareHtml(r,d){
  if(d.complete||!d.x)return '';
  const a=abilitySnapshot(r,d.x),isPrimary=d.primary==='capability';
  const outside=a.outside?`<div class="small">編成外の比較候補: <b>${a.outside.n}</b>（${a.spec.axes.map(([n,k])=>`${n}${grade(a.outside[k])}`).join(' / ')}）</div>`:'';
  return `<div class="ability-compare"><b>${isPrimary?'不足能力':'能力面（主因とは限らない）'} — ${a.spec.label}</b><div>このSectorで効く能力: <b>${a.spec.axes.map(([n,,w])=>`${n}${w<1?` ${Math.round(w*100)}%`:''}`).join(' + ')}</b></div><div>現編成: <b>${a.current}</b></div><div class="small">相対的に弱い: ${a.weak.n} / ${a.spec.context}</div>${outside}</div>`;
}
function concreteDiagnosisQuote(r,d){
  if(d.complete||!d.x)return '';
  const n=hero(d.speaker)?.n||hero(r.leader).n,best=bestRouteAction(d.x),a=abilitySnapshot(r,d.x);
  if(d.primary==='decision')return `<b>${n}</b>「${LABEL[d.x.d.pick]}では経路は確立しない。次は${best?LABEL[best]:'前進できる方法'}を選べる体制にしたい。」`;
  if(d.primary==='fit')return `<b>${n}</b>「${LABEL[d.x.d.pick]}は噛み合わなかった。${best&&best!==d.x.d.pick?`${LABEL[best]}の方がこの場には合っていたかもしれない。`:'人員か余力の方を見直したい。'}」`;
  if(d.primary==='capability')return `<b>${n}</b>「この場面では${a.spec.axes.map(([x])=>x).join('と')}が足りなかった。編成を見直した方がいい。」`;
  if(d.primary==='readiness'){const w=readinessWeakness(d.x);return `<b>${n}</b>「ここに着くまでに${w.label}を使いすぎた。前半の運用を変えたい。」`;}
  if(d.primary==='variance')return `<b>${n}</b>「今回は現地の崩れ方が大きい。人選だけを原因にはしない方がいい。」`;
  return diagnosisQuote(r,d);
}

// Replace the v0.2.6 quote with a more actionable, trace-grounded line.
diagnosisQuote=concreteDiagnosisQuote;

// Replace only the diagnostic card; simulation and other AAR sections remain unchanged.
diagnosisHtml=function(r){
  const d=diagnosis(r);
  if(d.complete)return `<div class="diagnosis good"><b>Mission Diagnosis</b><br>連続補給路はSector 10まで成立。残るMissionボトルネックはない。</div>`;
  const second=d.secondary&&d.secondary!==d.primary?` / 補助要因: ${causeText(d.secondary)}`:'';
  const levers=leverForCause(r,d);
  return `<div class="diagnosis"><b>Mission Diagnosis — 最大のボトルネック: Sector ${d.sector}</b><br>主因候補: <b>${causeText(d.primary)}</b>${second}<div class="small">${d.summary}</div>${abilityCompareHtml(r,d)}<div class="improvement"><b>次に変えるなら</b>${levers.map(x=>`<div>・${x}</div>`).join('')}</div><div class="field-voice">${diagnosisQuote(r,d)}</div><details><summary>診断根拠</summary><div class="small">主因は実際の隊長Action / Action Fit / Party実行能力 / 遠征余力 / 外乱を比較して選ぶ。能力欄は常に併記するが、能力不足が主因でない場合はその旨を明示する。成功率や内部raw scoreは表示しない。</div></details></div>`;
};

resetPrototype=function(){
  if(!confirm('MFP02.7の検証状態を初期化しますか？'))return;
  localStorage.removeItem(KEY);S=structuredClone(DEFAULT);renderMission();renderRoster();renderFormation();aarRoot.innerHTML='';aarBtn.disabled=true;go('mission');
};
