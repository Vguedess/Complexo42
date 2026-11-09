"use client";

import { useState } from "react";
import { Header } from "../../shared/components/demo-ui";

export function RoomsPanel() {
 const [selectedRoom,setSelectedRoom]=useState(0);
 return <>
<Header eyebrow="COMUNICAÇÃO / MICROEQUIPES" title="Salas de trabalho"/><div className="notice">Prévia visual, sem envio de mensagens ou armazenamento de conversas. Mensageria privada será liberada somente após autenticação e moderação.</div><div className="rooms"><div className="rooms-list">{["geral-produto","sprint-prototipo","duvidas-operacoes"].map((room,i)=><button key={room} className={i===selectedRoom?"room active":"room"} onClick={()=>setSelectedRoom(i)}># {room}<span>↗</span></button>)}</div><div className="room-content"><div className="room-top"># { ["geral-produto","sprint-prototipo","duvidas-operacoes"][selectedRoom]}<span>APENAS DEMO</span></div><div className="chat-note"><div className="chat-icon">42</div><h3>Um espaço por objetivo.</h3><p>Mensagens, decisões e links de trabalho ficam organizados por equipe. No protótipo não há comunicação real.</p><span>As permissões de leitura e escrita devem ser verificadas no servidor.</span></div></div></div>
 </>;
}
