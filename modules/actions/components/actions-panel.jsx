"use client";

import { Header } from "../../shared/components/demo-ui";
import { statuses } from "../workflow";
export function ActionsPanel({tasks,onAdvance}) {
 return <>
<Header eyebrow="GESTÃO DE ENTREGAS / KANBAN" title="Quadro de ações"><span className="counter">0{tasks.length} AÇÕES DEMO</span></Header><div className="notice">Clique em “Avançar” para testar o fluxo. As alterações são temporárias e desaparecem ao atualizar a página.</div><div className="kanban">{statuses.map(status=><section className="kanban-column" key={status}><div className="kanban-head"><h3>{status}</h3><span>{tasks.filter(t=>t.status===status).length}</span></div>{tasks.filter(t=>t.status===status).map(task=><article className="task" key={task.id}><div className="task-label">AÇÃO #{String(task.id).padStart(3,"0")} <b>{task.priority}</b></div><h4>{task.title}</h4><p>{task.team}</p>{status!=="Concluído"?<button onClick={()=>onAdvance(task.id)}>Avançar etapa ↗</button>:<div className="done">✓ ETAPA CONCLUÍDA</div>}</article>)}</section>)}</div>
 </>;
}
