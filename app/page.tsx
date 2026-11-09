"use client";

import { useMemo, useState } from "react";

type View = "painel" | "talentos" | "equipes" | "acoes" | "medalhas" | "salas" | "avaliacoes";
type TaskStatus = "A fazer" | "Em execução" | "Em revisão" | "Concluído";
type Task = { id: number; title: string; team: string; status: TaskStatus; priority: string };

const nav: {id:View; label:string; num:string}[] = [
  {id:"painel", label:"Visão geral",num:"01"}, {id:"talentos",label:"Mapa de talentos",num:"02"},
  {id:"equipes",label:"Incubadoras",num:"03"}, {id:"acoes",label:"Quadro de ações",num:"04"},
  {id:"medalhas",label:"Reconhecimentos",num:"05"}, {id:"salas",label:"Salas",num:"06"},
  {id:"avaliacoes",label:"Evolução",num:"07"}
];
const people = [
  {id:"01",city:"São Paulo / SP",skills:["Desenvolvimento web","UI/UX","TypeScript"],accomplishment:"Protótipo e documentação de produto",unit:"Produto digital"},
  {id:"02",city:"Belo Horizonte / MG",skills:["Organização","Gestão de projetos","Pesquisa"],accomplishment:"Coordenação de sprint piloto",unit:"Operações"},
  {id:"03",city:"Curitiba / PR",skills:["Audiovisual","Design","Comunicação"],accomplishment:"Pacote de identidade de projeto",unit:"Comunicação"},
  {id:"04",city:"Recife / PE",skills:["Dados","SQL","Análise"],accomplishment:"Painel de indicadores demonstrativo",unit:"Dados"},
];
const squads = [
  {name:"Laboratório Produto", desc:"Transformar necessidades em soluções digitais testáveis.",stage:"Sprint 01",members:["01","04"],accent:"blue"},
  {name:"Núcleo Operações", desc:"Desenhar e executar fluxos de trabalho colaborativos.",stage:"Formação",members:["02"],accent:"orange"},
  {name:"Estúdio Criativo", desc:"Prototipar comunicação e materiais de formação.",stage:"Sprint 01",members:["03"],accent:"violet"}
];
const initialTasks: Task[] = [
 {id:1,title:"Mapear capacidades das equipes",team:"Núcleo Operações",status:"A fazer",priority:"Alta"},
 {id:2,title:"Desenhar ficha de talentos",team:"Laboratório Produto",status:"Em execução",priority:"Alta"},
 {id:3,title:"Criar identidade da incubadora",team:"Estúdio Criativo",status:"Em revisão",priority:"Média"},
 {id:4,title:"Definir critérios de validação de entregas",team:"Laboratório Produto",status:"Concluído",priority:"Média"},
 {id:5,title:"Especificar regras das salas",team:"Núcleo Operações",status:"A fazer",priority:"Média"},
];
const statuses: TaskStatus[] = ["A fazer","Em execução","Em revisão","Concluído"];

function Icon({name}:{name:string}) {
 if (name==="arrow") return <span aria-hidden="true">↗</span>;
 if (name==="dot") return <span aria-hidden="true">●</span>;
 return <span aria-hidden="true">◆</span>;
}
function Header({ title, eyebrow, children }:{title:string;eyebrow:string;children?:React.ReactNode}){
 return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div><div className="heading-right">{children}</div></div>;
}
function Tag({children}:{children:React.ReactNode}){return <span className="tag">{children}</span>}

export default function Home() {
 const [view, setView] = useState<View>("painel");
 const [search,setSearch] = useState("");
 const [tasks,setTasks] = useState<Task[]>(initialTasks);
 const [selectedRoom,setSelectedRoom]=useState(0);
 const filteredPeople = useMemo(()=>people.filter(p=>[p.id,p.city,p.unit,p.accomplishment,...p.skills].join(" ").toLowerCase().includes(search.toLowerCase())),[search]);
 const completed = tasks.filter(t=>t.status==="Concluído").length;
 const currentLabel=nav.find(n=>n.id===view)?.label ?? "Visão geral";
 function advanceTask(id:number){setTasks(old=>old.map(t=>t.id===id?{...t,status:statuses[Math.min(statuses.indexOf(t.status)+1,statuses.length-1)]}:t));}
 return <div className="layout">
   <aside className="sidebar">
    <div className="brand"><div className="brand-mark">C<span>42</span></div><div><strong>COMPLEXO<span>42</span></strong><small>LAB DE DESENVOLVIMENTO</small></div></div>
    <div className="nav-title">WORKSPACE <span>///</span></div>
    <nav aria-label="Navegação principal">{nav.map(item=><button key={item.id} onClick={()=>setView(item.id)} className={view===item.id?"nav-item active":"nav-item"} aria-current={view===item.id?"page":undefined}><span className="nav-num">{item.num}</span><span>{item.label}</span><span className="nav-arrow">↗</span></button>)}</nav>
    <div className="sidebar-bottom"><span className="circle pulse"/>AMBIENTE DE DEMONSTRAÇÃO<div className="sidebar-sub">Dados fictícios · sem persistência</div></div>
   </aside>
   <div className="main-shell"><header className="topbar"><div className="crumb">C42 <span>/</span> WORKSPACE <span>/</span> {currentLabel.toUpperCase()}</div><div className="top-actions"><span className="top-beta">VERSÃO ALPHA — DEMO</span><div className="avatar">42</div></div></header>
     <main className="content">
      {view==="painel" && <><Header eyebrow="INTELIGÊNCIA COLETIVA / DASHBOARD" title="Pessoas. Potencial. Execução."><span className="status-pill"><Icon name="dot"/> Prévia interativa</span></Header><div className="intro"><div className="intro-kicker">ESTRUTURAR → MOBILIZAR → DESENVOLVER</div><h2>O talento certo.<br/><em>No time certo.</em></h2><p>Um ambiente para reconhecer habilidades, formar equipes, organizar ações e acompanhar a evolução das pessoas — do primeiro projeto às entregas reconhecidas.</p><button className="primary" onClick={()=>setView("talentos")}>Explorar talentos <span>↗</span></button><div className="shape one"/><div className="shape two"/></div>
        <div className="stats"><div className="stat"><div className="stat-label">PERFIS DE EXEMPLO</div><div className="stat-value">0{people.length}</div><span>Geografia + competências</span></div><div className="stat"><div className="stat-label">EQUIPES SIMULADAS</div><div className="stat-value">0{squads.length}</div><span>Formação multidisciplinar</span></div><div className="stat"><div className="stat-label">AÇÕES CONCLUÍDAS</div><div className="stat-value">0{completed}</div><span>Dados apenas nesta sessão</span></div><div className="stat"><div className="stat-label">MÓDULOS PLANEJADOS</div><div className="stat-value">07</div><span>Entrega gradual por fases</span></div></div>
        <div className="two-col"><section className="panel"><div className="panel-heading"><h3>Fluxo de desenvolvimento</h3><span>VISÃO OPERACIONAL</span></div><div className="timeline">{[["01","Identificar talentos","Habilidades, cidade/UF e feitos voluntários"],["02","Montar as incubadoras","Equipes orientadas a objetivos e capacidades"],["03","Executar ações","Quadro de tarefas, responsáveis e entregas"],["04","Reconhecer e evoluir","Medalhas verificadas e feedback privado"]].map((e,i)=><div className="timeline-item" key={e[0]}><span className="index">{e[0]}</span><div><b>{e[1]}</b><p>{e[2]}</p></div><span className="timeline-line">{i===3?"✓":"↘"}</span></div>)}</div></section><section className="panel dark-panel"><div className="panel-heading"><h3>Princípio de produto</h3><span>MANIFESTO 001</span></div><div className="quote">"Não é apenas um CRM.<br/>É uma infraestrutura de <i>desenvolvimento de pessoas.</i>"</div><div className="fine-rule"/><p>Competência demonstrada, entregas verificáveis e reconhecimento com contexto. A plataforma não deve criar rankings públicos de pessoas.</p><button className="text-link" onClick={()=>setView("avaliacoes")}>Ver módulo de evolução ↗</button></section></div>
      </>}
      {view==="talentos" && <><Header eyebrow="DIRETÓRIO / COMPETÊNCIAS" title="Mapa de talentos"><span className="counter">0{filteredPeople.length} / 0{people.length}</span></Header><div className="notice">Perfis fictícios para validação de interface. Dados pessoais reais exigirão autenticação, autorização e política de privacidade.</div><div className="toolbar"><input aria-label="Filtrar talentos" placeholder="Buscar habilidade, área ou cidade..." value={search} onChange={e=>setSearch(e.target.value)}/><span>FILTRAR PERFIS DE EXEMPLO</span></div><div className="people-grid">{filteredPeople.map(p=><article className="person-card" key={p.id}><div className="person-row"><div className="person-avatar">{p.id}</div><span className="person-id">PERFIL / {p.id}</span></div><h3>Pessoa {p.id}</h3><div className="geo">{p.city}</div><div className="micro-label">HABILIDADES</div><div className="tags">{p.skills.map(s=><Tag key={s}>{s}</Tag>)}</div><div className="micro-label">FEITO DEMONSTRATIVO</div><p>{p.accomplishment}</p><span className="person-unit">ÁREA · {p.unit}</span></article>)}</div>{filteredPeople.length===0&&<div className="empty">Nenhum perfil de exemplo corresponde à pesquisa.</div>}</>}
      {view==="equipes" && <><Header eyebrow="FORMAÇÃO DE TIMES / INCUBADORAS" title="Equipes que constroem"><span className="counter">03 UNIDADES</span></Header><div className="section-lead">O objetivo é combinar capacidades complementares, contexto e disponibilidade — não somente quantidade de participantes.</div><div className="squad-grid">{squads.map((s,i)=><article className={`squad ${s.accent}`} key={s.name}><div className="squad-top"><span>INCUBADORA 0{i+1}</span><span>{s.stage.toUpperCase()}</span></div><h2>{s.name}</h2><p>{s.desc}</p><div className="squad-foot"><span>{s.members.length} PERFIL(IS) DE EXEMPLO</span><div className="mini-avatars">{s.members.map(m=><span key={m}>{m}</span>)}</div></div></article>)}</div></>}
      {view==="acoes" && <><Header eyebrow="GESTÃO DE ENTREGAS / KANBAN" title="Quadro de ações"><span className="counter">0{tasks.length} AÇÕES DEMO</span></Header><div className="notice">Clique em “Avançar” para testar o fluxo. As alterações são temporárias e desaparecem ao atualizar a página.</div><div className="kanban">{statuses.map(status=><section className="kanban-column" key={status}><div className="kanban-head"><h3>{status}</h3><span>{tasks.filter(t=>t.status===status).length}</span></div>{tasks.filter(t=>t.status===status).map(task=><article className="task" key={task.id}><div className="task-label">AÇÃO #{String(task.id).padStart(3,"0")} <b>{task.priority}</b></div><h4>{task.title}</h4><p>{task.team}</p>{status!=="Concluído"?<button onClick={()=>advanceTask(task.id)}>Avançar etapa ↗</button>:<div className="done">✓ ETAPA CONCLUÍDA</div>}</article>)}</section>)}</div></>}
      {view==="medalhas" && <><Header eyebrow="CREDENCIAIS / RECONHECIMENTO" title="Medalhas com evidência"/><div className="section-lead">Reconhecimentos são emitidos por responsáveis autorizados e vinculados a uma entrega verificável, não apenas a popularidade ou afinidade pessoal.</div><div className="medals">{[["01","Construtor","Contribuiu para um protótipo validado."],["02","Colaboração","Apoiou uma entrega multidisciplinar."],["03","Liderança aplicada","Orientou a conclusão de uma atividade."],["04","Execução","Realizou uma tarefa com validação de entrega."]].map(x=><article className="medal" key={x[0]}><div className="medal-disc"><span>{x[0]}</span><div className="medal-star">✦</div></div><h3>{x[1]}</h3><p>{x[2]}</p><div className="micro-label">MODELO / NÃO EMITIDA</div></article>)}</div></>}
      {view==="salas" && <><Header eyebrow="COMUNICAÇÃO / MICROEQUIPES" title="Salas de trabalho"/><div className="notice">Prévia visual, sem envio de mensagens ou armazenamento de conversas. Mensageria privada será liberada somente após autenticação e moderação.</div><div className="rooms"><div className="rooms-list">{["geral-produto","sprint-prototipo","duvidas-operacoes"].map((room,i)=><button key={room} className={i===selectedRoom?"room active":"room"} onClick={()=>setSelectedRoom(i)}># {room}<span>↗</span></button>)}</div><div className="room-content"><div className="room-top"># { ["geral-produto","sprint-prototipo","duvidas-operacoes"][selectedRoom]}<span>APENAS DEMO</span></div><div className="chat-note"><div className="chat-icon">42</div><h3>Um espaço por objetivo.</h3><p>Mensagens, decisões e links de trabalho ficam organizados por equipe. No protótipo não há comunicação real.</p><span>As permissões de leitura e escrita devem ser verificadas no servidor.</span></div></div></div></>}
      {view==="avaliacoes" && <><Header eyebrow="FEEDBACK / DESENVOLVIMENTO" title="Evolução com contexto"/><div className="section-lead">Avaliações qualitativas privadas, justificadas e sujeitas a revisão. Medalhas e entregas podem compor o portfólio; notas individuais não devem ser expostas publicamente.</div><div className="two-col"><section className="panel"><div className="panel-heading"><h3>Dimensões de evolução</h3><span>MODELO PROPOSTO</span></div>{[["Qualidade das entregas",78],["Colaboração",88],["Compromisso com prazos",66],["Evolução técnica",83]].map(x=><div className="bar-item" key={x[0]}><div><span>{x[0]}</span><span>EXEMPLO</span></div><div className="bar-track"><i style={{width:`${x[1]}%`}}/></div></div>)}<p className="muted">Números sintéticos, sem qualquer avaliação real.</p></section><section className="panel"><div className="panel-heading"><h3>Governança das avaliações</h3><span>REQUISITOS</span></div><div className="checklist">{["Responsável autorizado e identificação da avaliação","Evidência e critérios documentados","Visibilidade apenas ao avaliado e gestores autorizados","Direito de contestação e retificação","Trilha de auditoria e prazo de retenção"].map(s=><div className="check" key={s}><span>✓</span>{s}</div>)}</div></section></div></>}
     </main><footer className="footer"><span>COMPLEXO42 // PROTÓTIPO V0.1</span><span>SEM USUÁRIOS REAIS · SEM BANCO DE DADOS</span></footer>
   </div>
 </div>;
}
