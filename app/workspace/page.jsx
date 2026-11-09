"use client";

import { useState } from "react";
import { nav } from "../../modules/shared/navigation";
import { DashboardPanel } from "../../modules/dashboard/components/dashboard-panel";
import { TalentsPanel } from "../../modules/talents/components/talents-panel";
import { TeamsPanel } from "../../modules/teams/components/teams-panel";
import { ActionsPanel } from "../../modules/actions/components/actions-panel";
import { BadgesPanel } from "../../modules/badges/components/badges-panel";
import { RoomsPanel } from "../../modules/rooms/components/rooms-panel";
import { EvaluationsPanel } from "../../modules/evaluations/components/evaluations-panel";
import { initialTasks } from "../../modules/actions/data/demo";
import { advanceTask } from "../../modules/actions/workflow";
import { people } from "../../modules/talents/data/demo";
import { squads } from "../../modules/teams/data/demo";

export default function Home() {
 const [view,setView] = useState("painel");
 const [tasks,setTasks] = useState(initialTasks);
 const completed = tasks.filter(task=>task.status==="Concluído").length;
 const currentLabel = nav.find(item=>item.id===view)?.label ?? "Visão geral";
 function onAdvance(id:number) { setTasks(previous=>advanceTask(previous,id)); }
 return <div className="layout">
   <aside className="sidebar">
    <div className="brand"><div className="brand-mark">C<span>42</span></div><div><strong>COMPLEXO<span>42</span></strong><small>LAB DE DESENVOLVIMENTO</small></div></div>
    <div className="nav-title">WORKSPACE <span>///</span></div>
    <nav aria-label="Navegação principal">{nav.map(item=><button key={item.id} onClick={()=>setView(item.id)} className={view===item.id?"nav-item active":"nav-item"} aria-current={view===item.id?"page":undefined}><span className="nav-num">{item.num}</span><span>{item.label}</span><span className="nav-arrow">↗</span></button>)}</nav>
    <div className="sidebar-bottom"><span className="circle pulse"/>AMBIENTE DE DEMONSTRAÇÃO<div className="sidebar-sub">Dados fictícios · sem persistência</div></div>
   </aside>
   <div className="main-shell"><header className="topbar"><div className="crumb">C42 <span>/</span> WORKSPACE <span>/</span> {currentLabel.toUpperCase()}</div><div className="top-actions"><span className="top-beta">VERSÃO ALPHA — DEMO</span><div className="avatar">42</div></div></header>
     <main className="content">
       {view==="painel" && <DashboardPanel peopleCount={people.length} teamsCount={squads.length} completedCount={completed} onNavigate={setView} />}
       {view==="talentos" && <TalentsPanel />}
       {view==="equipes" && <TeamsPanel />}
       {view==="acoes" && <ActionsPanel tasks={tasks} onAdvance={onAdvance} />}
       {view==="medalhas" && <BadgesPanel />}
       {view==="salas" && <RoomsPanel />}
       {view==="avaliacoes" && <EvaluationsPanel />}
     </main><footer className="footer"><span>COMPLEXO42 // PROTÓTIPO V0.1</span><span>SEM USUÁRIOS REAIS · SEM BANCO DE DADOS</span></footer>
   </div>
 </div>;
}
