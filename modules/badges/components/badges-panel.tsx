import { Header } from "../../shared/components/demo-ui";

export function BadgesPanel() {
 return <>
<Header eyebrow="CREDENCIAIS / RECONHECIMENTO" title="Medalhas com evidência"/><div className="section-lead">Reconhecimentos são emitidos por responsáveis autorizados e vinculados a uma entrega verificável, não apenas a popularidade ou afinidade pessoal.</div><div className="medals">{[["01","Construtor","Contribuiu para um protótipo validado."],["02","Colaboração","Apoiou uma entrega multidisciplinar."],["03","Liderança aplicada","Orientou a conclusão de uma atividade."],["04","Execução","Realizou uma tarefa com validação de entrega."]].map(x=><article className="medal" key={x[0]}><div className="medal-disc"><span>{x[0]}</span><div className="medal-star">✦</div></div><h3>{x[1]}</h3><p>{x[2]}</p><div className="micro-label">MODELO / NÃO EMITIDA</div></article>)}</div>
 </>;
}
