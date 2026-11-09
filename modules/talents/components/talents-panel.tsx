"use client";

import { useMemo, useState } from "react";
import { Header, Tag } from "../../shared/components/demo-ui";
import { people } from "../data/demo";

export function TalentsPanel() {
 const [search,setSearch]=useState("");
 const filteredPeople=useMemo(()=>people.filter(p=>[p.id,p.city,p.unit,p.accomplishment,...p.skills].join(" ").toLowerCase().includes(search.trim().toLowerCase())),[search]);
 return <>
<Header eyebrow="DIRETÓRIO / COMPETÊNCIAS" title="Mapa de talentos"><span className="counter">0{filteredPeople.length} / 0{people.length}</span></Header><div className="notice">Perfis fictícios para validação de interface. Dados pessoais reais exigirão autenticação, autorização e política de privacidade.</div><div className="toolbar"><input aria-label="Filtrar talentos" placeholder="Buscar habilidade, área ou cidade..." value={search} onChange={e=>setSearch(e.target.value)}/><span>FILTRAR PERFIS DE EXEMPLO</span></div><div className="people-grid">{filteredPeople.map(p=><article className="person-card" key={p.id}><div className="person-row"><div className="person-avatar">{p.id}</div><span className="person-id">PERFIL / {p.id}</span></div><h3>Pessoa {p.id}</h3><div className="geo">{p.city}</div><div className="micro-label">HABILIDADES</div><div className="tags">{p.skills.map(s=><Tag key={s}>{s}</Tag>)}</div><div className="micro-label">FEITO DEMONSTRATIVO</div><p>{p.accomplishment}</p><span className="person-unit">ÁREA · {p.unit}</span></article>)}</div>{filteredPeople.length===0&&<div className="empty">Nenhum perfil de exemplo corresponde à pesquisa.</div>}
 </>;
}
