import Link from "next/link";
import {Suspense} from "react";
import {CARD_IDS,loadCard} from "../data/cards.mjs";

const symbols={formacao:"◈",equipes:"✳",acoes:"↗",talentos:"✧",medalhas:"✦",salas:"⌘"};

function CardSkeleton({id}) {
 return <article className="c42-card c42-loading" aria-label={"Carregando "+id}>
  <span className="c42-skeleton" style={{width:"50%"}}/>
  <span className="c42-skeleton" style={{width:"70%",height:26,marginTop:25}}/>
  <span className="c42-skeleton" style={{width:"31%",height:54,marginTop:25}}/>
 </article>;
}

async function Card({id,viewer,preview}) {
 const item=await loadCard(viewer,preview,id);
 return <article className="c42-card">
  <div className="c42-card-overline"><span>0{CARD_IDS.indexOf(id)+1} / {id.toUpperCase()}</span><span className="c42-card-symbol" aria-hidden="true">{symbols[id]}</span></div>
  <h3>{item.title}</h3>
  <div className="c42-number"><strong>{item.number}</strong><span>{item.unit}</span></div>
  <p>{item.description}</p>
  <div className="c42-card-bottom">
   <div className="c42-meter" aria-hidden="true"><span style={{width:item.progress+"%"}}/></div>
   <Link href="/workspace">{item.action}<span aria-hidden="true">↗</span></Link>
  </div>
 </article>;
}

/** React Server Components com um limite Suspense por módulo. */
export function ModuleCards({viewer,preview}) {
 return <section className="c42-modules" id="modulos" aria-labelledby="c42-modules-title">
  <div className="c42-section-heading"><div><span className="c42-kicker-dark">UM SISTEMA. MÚLTIPLAS JORNADAS.</span><h2 id="c42-modules-title">Seu espaço de atuação<span>.</span></h2></div>
  <p>Os cartões são os mesmos. O conteúdo se adapta ao papel verificado no servidor. Por enquanto, todos os números são fictícios.</p></div>
  <div className="c42-grid">
   {CARD_IDS.map(id=><Suspense key={id} fallback={<CardSkeleton id={id}/>}><Card id={id} viewer={viewer} preview={preview}/></Suspense>)}
  </div>
 </section>;
}
