import { Header } from "../../shared/components/demo-ui";
import { squads } from "../data/demo";

export function TeamsPanel() {
 return <>
<Header eyebrow="FORMAÇÃO DE TIMES / INCUBADORAS" title="Equipes que constroem"><span className="counter">03 UNIDADES</span></Header><div className="section-lead">O objetivo é combinar capacidades complementares, contexto e disponibilidade — não somente quantidade de participantes.</div><div className="squad-grid">{squads.map((s,i)=><article className={`squad ${s.accent}`} key={s.name}><div className="squad-top"><span>INCUBADORA 0{i+1}</span><span>{s.stage.toUpperCase()}</span></div><h2>{s.name}</h2><p>{s.desc}</p><div className="squad-foot"><span>{s.members.length} PERFIL(IS) DE EXEMPLO</span><div className="mini-avatars">{s.members.map(m=><span key={m}>{m}</span>)}</div></div></article>)}</div>
 </>;
}
