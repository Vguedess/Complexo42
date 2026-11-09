export type View = "painel" | "talentos" | "equipes" | "acoes" | "medalhas" | "salas" | "avaliacoes";

export const nav: {id:View; label:string; num:string}[] = [
  {id:"painel", label:"Visão geral",num:"01"}, {id:"talentos",label:"Mapa de talentos",num:"02"},
  {id:"equipes",label:"Incubadoras",num:"03"}, {id:"acoes",label:"Quadro de ações",num:"04"},
  {id:"medalhas",label:"Reconhecimentos",num:"05"}, {id:"salas",label:"Salas",num:"06"},
  {id:"avaliacoes",label:"Evolução",num:"07"}
];
