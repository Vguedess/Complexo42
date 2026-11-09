import { Header } from "../../shared/components/demo-ui";

export function EvaluationsPanel() {
 return <>
<Header eyebrow="FEEDBACK / DESENVOLVIMENTO" title="Evolução com contexto"/><div className="section-lead">Avaliações qualitativas privadas, justificadas e sujeitas a revisão. Medalhas e entregas podem compor o portfólio; notas individuais não devem ser expostas publicamente.</div><div className="two-col"><section className="panel"><div className="panel-heading"><h3>Dimensões de evolução</h3><span>MODELO PROPOSTO</span></div>{[["Qualidade das entregas",78],["Colaboração",88],["Compromisso com prazos",66],["Evolução técnica",83]].map(x=><div className="bar-item" key={x[0]}><div><span>{x[0]}</span><span>EXEMPLO</span></div><div className="bar-track"><i style={{width:`${x[1]}%`}}/></div></div>)}<p className="muted">Números sintéticos, sem qualquer avaliação real.</p></section><section className="panel"><div className="panel-heading"><h3>Governança das avaliações</h3><span>REQUISITOS</span></div><div className="checklist">{["Responsável autorizado e identificação da avaliação","Evidência e critérios documentados","Visibilidade apenas ao avaliado e gestores autorizados","Direito de contestação e retificação","Trilha de auditoria e prazo de retenção"].map(s=><div className="check" key={s}><span>✓</span>{s}</div>)}</div></section></div>
 </>;
}
