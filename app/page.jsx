import Link from "next/link";
import {Suspense} from "react";
import {getVerifiedViewer} from "../lib/security/viewer";
import {AccessCard} from "../modules/home/components/access";
import {ModuleCards} from "../modules/home/components/cards";

export const dynamic="force-dynamic";

export default async function Home({searchParams}) {
 const [params,viewer]=await Promise.all([searchParams,getVerifiedViewer()]);
 const preview=params?.preview==="professor"?"professor":"aluno";
 return <div className="c42-home">
  <div className="c42-utility"><span>COMPLEXO42 <b>///</b> DESENVOLVIMENTO COLETIVO</span><span>ALPHA · AMBIENTE DEMONSTRATIVO</span></div>
  <header className="c42-header">
   <Link href="/" className="c42-logo" aria-label="Complexo42 início"><span className="c42-logo-symbol">C<small>42</small></span><span>COMPLEXO<em>42</em><small>FORMAÇÃO / EQUIPES / EXECUÇÃO</small></span></Link>
   <nav className="c42-nav" aria-label="Navegação principal"><a href="#proposta">A proposta</a><a href="#modulos">Módulos</a><a href="#acesso">Acesso</a></nav>
   <Link href="/workspace" className="c42-nav-cta">Abrir laboratório <span>↗</span></Link>
  </header>
  <main>
   <section className="c42-hero" id="proposta">
    <div className="c42-hero-main">
     <div className="c42-hero-kicker"><i/> APRENDER. APLICAR. LIDERAR.</div>
     <h1>O talento<br/>encontra <em>seu lugar.</em></h1>
     <p>Um centro de desenvolvimento para transformar conhecimento em equipes, projetos e entregas verificáveis. A formação ganha direção. O esforço ganha evidência.</p>
     <div className="c42-actions"><a href="#modulos" className="c42-primary">Conhecer os módulos <span>↗</span></a><Link href="/workspace" className="c42-text-link">Ver protótipo interativo <span>→</span></Link></div>
     <div className="c42-hero-foot"><span>01 / FORMAÇÃO</span><span>02 / COMUNIDADE</span><span>03 / EXECUÇÃO</span></div>
     <div className="c42-orbit c42-orbit-1" aria-hidden="true"/><div className="c42-orbit c42-orbit-2" aria-hidden="true"/><div className="c42-giant" aria-hidden="true">42</div>
    </div>
    <AccessCard preview={preview}/>
   </section>
   <div className="c42-ribbon"><span>◈ &nbsp; AMBIENTE MODULAR</span><span>✳ &nbsp; UM PAINEL, MÚLTIPLOS PAPÉIS</span><span>↗ &nbsp; NEXT.JS / STREAMING</span><span>IDENTIDADE INSPIRADA NA ACADEMIA MBL</span></div>
   <Suspense fallback={<div className="c42-pending">Preparando a visualização de demonstração...</div>}>
    <ModuleCards viewer={viewer} preview={preview}/>
   </Suspense>
   <section className="c42-manifesto"><div><span>PRINCÍPIO DE PRODUTO</span><h2>Não é só acompanhar.<br/><em>É desenvolver.</em></h2></div><div><p>Menos cadastros isolados. Mais conexão entre capacidades, prática e reconhecimento — respeitando a privacidade de cada participante.</p><Link href="/workspace">Explorar o laboratório <span>↗</span></Link></div></section>
  </main>
  <footer className="c42-footer"><strong>C42 <span>/ COMPLEXO42</span></strong><p>Identidade visual própria, inspirada na <a href="https://academia.mbl.org.br/" target="_blank" rel="noopener noreferrer">Academia MBL</a>. Protótipo não oficial.</p><p>Sem login ativo · Sem dados pessoais armazenados</p></footer>
 </div>;
}
