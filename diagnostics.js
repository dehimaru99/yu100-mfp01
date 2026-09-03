// MFP02.6 presentation/diagnostic layer. Does not change simulation equations.
const _resolve026=resolve;
resolve=function(party,e,d,seed,st){
  const avg=k=>party.reduce((z,h)=>z+h[k],0)/party.length;
  const C=e.t==='UNKNOWN_ROUTE'?.75*avg('e')+.25*avg('r'):e.t==='ENEMY'?.70*avg('c')+.30*avg('r'):avg('r');
  const ready=.60*st.health+.25*(1-st.fatigue)+.15*(st.supplies/100);
  const o=_resolve026(party,e,d,seed,st);
  const score=clip(.45*o.F+.35*C+.20*ready+o.eta);
  return {...o,C,ready,score};
};

function markFromUnit(v){return v>=.72?'↑↑':v>=.57?'↑':v<=.28?'↓↓':v<=.43?'↓':'→'}
function leaderPreviewActions(h){
  const out=[];
  for(let s=S.world.frontier+1;s<=10;s++){
    const e={...SECTOR[s],s};
    if(!e.a) continue;
    const p={d:e.dg,rw:e.rw,cf:.5};
    const scores=pScores(h,e,p);
    out.push(Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0]);
  }
  return out;
}
function leaderPreviewHtml(h){
  if(!h)return '';
  const actions=leaderPreviewActions(h);
  const p=averageProfile(actions);
  const others=S.sel.filter(id=>id!==h.id);
  const trust=others.length?others.reduce((z,id)=>z+getTrust(h.id,id),0)/others.length:.5;
  const trace=actions.slice(0,4).map(a=>LABEL[a]).join(' → ')+(actions.length>4?' …':'');
  return `<div class="leader-preview"><b>${h.n}を隊長にした場合の運用予測</b><div class="profile-row"><span class="impact ${profileClass(p.mission)}">任務${profileMark(p.mission)}</span><span class="impact ${profileClass(p.safety)}">安全${profileMark(p.safety)}</span><span class="impact ${profileClass(p.preserve)}">温存${profileMark(p.preserve)}</span><span class="impact ${profileClass(p.learning)}">学習${profileMark(p.learning)}</span><span class="impact ${profileClass(p.relation)}">関係${profileMark(p.relation)}</span></div><div class="small">想定自己提案: ${trace||'残りSectorなし'} / 他メンバーへの現在の平均信頼 ${markFromUnit(trust)}</div><div class="small">戦闘・探索・粘りの基礎能力は隊長指定では変化しない。表示は現在のMission / Policyを前提にした判断傾向の概算で、成功率予言ではない。</div></div>`;
}

const _renderMission026=renderMission;
renderMission=function(){
  _renderMission026();
  risk.onchange=()=>{S.risk=risk.value;save()};
  priority.onchange=()=>{S.priority=priority.value;save()};
};

renderFormation=function(){
  formationGrid.innerHTML=HEROES.map(h=>card(h,true)).join('');
  leader.innerHTML=S.sel.map(id=>`<option value="${id}">${hero(id).n}</option>`).join('');
  leader.value=S.leader;
  leader.onchange=()=>{S.leader=leader.value;save();renderFormation()};
  const p=S.sel.map(hero),cap=sortieCapacity(S.org.reserve),closed=S.missionStatus!=='ACTIVE';
  partySummary.innerHTML=`選択 ${p.length}/4　隊長: ${hero(S.leader)?.n||'-'}<br><span class="small">編成基礎能力 — 戦闘 ${grade(p.reduce((z,h)=>z+h.c,0)/p.length)} / 探索 ${grade(p.reduce((z,h)=>z+h.e,0)/p.length)} / 粘り ${grade(p.reduce((z,h)=>z+h.r,0)/p.length)}<br>第${S.month}月 / 本部運用余力 ${S.org.reserve}% / 今回の携行物資上限 ${cap}</span>${leaderPreviewHtml(hero(S.leader))}${closed?`<br><b>${statusLabel()} — 新たな遠征は実行できません。</b>`:''}`;
  startBtn.disabled=p.length!==4||closed;
};

function localResultLabel(cls){return cls==='STRONG SUCCESS'?'非常に良好':cls==='SUCCESS'?'良好':cls==='SETBACK'?'難航':'不調'}
function expeditionResultLabel(r){return r.result==='SUCCESS'?'目標達成':r.result==='PARTIAL SUCCESS'?'前進あり':'前進なし'}
function sectorStateLabel(x){return x.safe?'補給路確立':'未確立'}
function unresolvedEvent(r){
  if(r.frontierAfter>=10)return null;
  const wanted=r.frontierAfter+1;
  return r.events.find(x=>x.sector===wanted)||r.events.find(x=>!x.safe)||null;
}
function outcomeCauseScores(x){
  return [
    {k:'fit',v:.45*(1-(x.o.F??.5))},
    {k:'capability',v:.35*(1-(x.o.C??.5))},
    {k:'readiness',v:.20*(1-(x.o.ready??.5))},
    {k:'variance',v:Math.max(0,-(x.o.eta||0))}
  ].sort((a,b)=>b.v-a.v);
}
function weakestForEvent(r,x){return r.party.map(id=>hero(id)).sort((a,b)=>ability(a,x.e)-ability(b,x.e))[0]}
function causeText(k){return {decision:'隊長判断',fit:'状況との判断適合',capability:'必要能力',readiness:'遠征余力',variance:'現地外乱'}[k]||k}
function diagnosis(r){
  if(r.frontierAfter>=10)return {complete:true};
  const x=unresolvedEvent(r);
  if(!x)return {complete:false,sector:r.frontierAfter+1,primary:'readiness',secondary:null,speaker:r.leader,summary:'未確立区間へ到達できなかった。'};
  const nonEstablish=['RETREAT','AVOID','REPORT'].includes(x.d.pick);
  let primary,secondary,summary,speaker=r.leader,weak=null;
  if(nonEstablish){
    primary='decision';
    const ranked=outcomeCauseScores(x);secondary=ranked[0]?.k||null;
    summary=`${LABEL[x.d.pick]}は局所対応として成立しても、このSectorの補給路を確立しない選択だった。`;
  }else{
    const ranked=outcomeCauseScores(x);primary=ranked[0].k;secondary=ranked[1]?.k||null;
    summary=x.d.pick==='SCOUT'?'偵察による確立条件に届かなかった。':'補給路確立に必要な実行結果の強度へ届かなかった。';
    if(primary==='capability'){weak=weakestForEvent(r,x);speaker=weak.id}
  }
  return {complete:false,x,sector:x.sector,primary,secondary,speaker,weak,summary};
}
function diagnosisQuote(r,d){
  if(d.complete)return '';
  const n=hero(d.speaker)?.n||hero(r.leader).n;
  if(d.primary==='decision')return `<b>${n}</b>「あの場では${LABEL[d.x.d.pick]}を選んだ。だが、それだけでは経路そのものは繋がらない。」`;
  if(d.primary==='capability'){
    const t=d.x.e.t==='UNKNOWN_ROUTE'?'この経路を読み切れなかった。探索に強い人員がいれば違ったかもしれない。':d.x.e.t==='ENEMY'?'正面の対応力が足りなかった。戦闘に強い人員が必要だったかもしれない。':'消耗した状況を支え切れなかった。粘りのある人員がもう少し必要だったかもしれない。';
    return `<b>${n}</b>「${t}」`;
  }
  if(d.primary==='readiness')return `<b>${n}</b>「ここに着いた時点で余力が少なかった。前半の消耗を抑える余地はある。」`;
  if(d.primary==='variance')return `<b>${n}</b>「判断だけでは避け切れない崩れ方だった。今回は現地状況の悪化が大きい。」`;
  return `<b>${n}</b>「選んだやり方が、この状況には十分噛み合っていなかったかもしれない。」`;
}
function diagnosisHtml(r){
  const d=diagnosis(r);
  if(d.complete)return `<div class="diagnosis good"><b>Mission Diagnosis</b><br>連続補給路はSector 10まで成立。残るMissionボトルネックはない。</div>`;
  const second=d.secondary&&d.secondary!==d.primary?` / 補助要因: ${causeText(d.secondary)}`:'';
  const weak=d.weak?`<div class="small">この局面で必要能力が相対的に低かった人物: ${d.weak.n}（犯人判定ではなく、編成上の弱点候補）</div>`:'';
  return `<div class="diagnosis"><b>Mission Diagnosis — 最大のボトルネック: Sector ${d.sector}</b><br>主因候補: <b>${causeText(d.primary)}</b>${second}<div class="small">${d.summary}</div>${weak}<div class="field-voice">${diagnosisQuote(r,d)}</div><details><summary>診断根拠</summary><div class="small">診断は実際の隊長Action、Action Fit、Party実行能力、遠征余力、外乱を比較して最大要因を選ぶ。内部スコアそのものは攻略値として表示しない。</div></details></div>`;
}

renderExpedition=function(r){
  runHead.innerHTML=`<b>第${r.month}月 — 北部補給路の確立</b><br>補給路運用可能 Sector 1–${r.frontierBefore} / 目標 Sector 10<br>本部運用余力 ${r.hqBefore}% / 携行物資 ${r.initialSupplies} / 100<br>隊長 ${hero(r.leader).n} / ${r.risk} / ${r.priority}<br><span class="small">現場結果とSector確立を分離して表示する。↑↓はAction Profileで、追加Outcome補正ではない。</span>`;
  eventLog.innerHTML=r.events.map(x=>{const a=x.d.adv.slice().sort((p,q)=>q.w-p.w)[0];return`<div class="card"><h3>Sector ${x.sector} — ${x.e.title}</h3><div class="proposals">${r.party.map(id=>{const act=x.prs[id].a;return`<div class="proposal"><b>${hero(id).n}</b><br>${LABEL[act]}${profileHtml(act)}</div>`}).join('')}</div><div class="decision"><b>隊長判断: ${LABEL[x.d.pick]}</b>${profileHtml(x.d.pick)}<br><span class="small">主要助言: ${a?hero(a.id).n+' '+LABEL[a.a]:'なし'} / ${x.o.proc}</span></div><div class="outcome"><b>現場結果: ${localResultLabel(x.o.cls)}</b><br><b>Sector状態: ${sectorStateLabel(x)}</b>${x.safe?'':'（情報は持ち帰る）'}<br>携行物資 -${x.cost}<br><span class="small">残携行物資 ${x.suppliesAfter} / 外乱 ${x.o.variance}</span></div></div>`}).join('');
};

renderAAR=function(){
  const r=S.last;if(!r){aarRoot.innerHTML='<div class="summary">まだ遠征結果がない。</div>';return}
  const ni=[...new Set([...r.safeNew,...r.knownNew])].sort((a,b)=>a-b),cls=r.missionStatus==='SUCCESS'?'good':r.missionStatus==='FAILED'?'bad':r.result==='FAILURE'?'bad':'';
  const missionLine=r.missionStatus==='SUCCESS'?'MISSION COMPLETE':r.missionStatus==='FAILED'?`MISSION FAILED — ${r.missionFailureReason}`:'MISSION ACTIVE';
  aarRoot.innerHTML=`<div class="result ${cls}"><span class="small">第${r.month}月 / 遠征成果</span><h2>${expeditionResultLabel(r)}</h2><b>${missionLine}</b><br>北部補給路をSector 10まで運用可能にする${trackHtml(r.frontierAfter,r.knownAfter,r.reached)}<div class="kpis"><div class="kpi">遠征到達<b>Sector ${r.reached}</b></div><div class="kpi">補給路運用可能<b>${delta('Sector 1–'+r.frontierBefore,'Sector 1–'+r.frontierAfter)}</b></div><div class="kpi">北部生活備蓄<b>${delta(r.northBefore.toFixed(2),r.northAfter.toFixed(2),'か月分')}</b></div><div class="kpi">本部運用余力<b>${delta(r.hqBefore,r.hqAfter,'%')}</b></div><div class="kpi">北部安定輸送能力<b>${delta(r.transportBefore,r.transportAfter,'%')}</b></div><div class="kpi">次回携行物資上限<b>${r.nextSupplyCapacity} / 100</b></div></div><p><b>残るボトルネック:</b> ${r.bottleneckAfter}</p><p>新規情報: ${ni.length?ni.map(s=>'Sector '+s).join(', '):'なし'}</p></div>${diagnosisHtml(r)}<div class="card"><h3>1か月のコスト → 効果</h3>${causalHtml(r)}</div><div class="card"><h3>Key Decisions</h3>${r.events.map(x=>`<div class="row"><span>S${x.sector} ${x.e.title}</span><span>${LABEL[x.d.pick]} / 現場 ${localResultLabel(x.o.cls)} / Sector ${sectorStateLabel(x)}</span></div>`).join('')}</div><div class="card"><h3>Behavioral Pattern</h3><p class="small">各人物が提案したActionの累積傾向。人物差を結果の読み直しに使うための表示で、追加補正ではない。</p>${behavioralPatternHtml(r)}</div><div class="card"><h3>Personal Appraisal</h3><p class="small">以下は客観的Resultではなく各人物の受け止め。</p>${r.appraisals.map(a=>`<div class="appraisal"><b>${hero(a.id).n}</b><br>「${a.text}」</div>`).join('')}</div><div class="card"><h3>Persistent Human Changes</h3>${changes(r)}</div>`;
  debug.textContent=JSON.stringify({state:S,last:r,diagnosis:diagnosis(r)},null,2);
};

resetPrototype=function(){if(!confirm('MFP02.6の検証状態を初期化しますか？'))return;localStorage.removeItem(KEY);S=structuredClone(DEFAULT);renderMission();renderRoster();renderFormation();aarRoot.innerHTML='';aarBtn.disabled=true;go('mission')};

renderMission();
renderFormation();
if(S.last)renderAAR();
