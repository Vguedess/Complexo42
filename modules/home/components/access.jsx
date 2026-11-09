import Link from "next/link";

/** Apenas placeholders desabilitados: não recebem nem armazenam senhas. */
export function AccessCard({preview}) {
 return <aside className="c42-access" id="acesso" aria-labelledby="c42-access-heading">
  <div className="c42-access-top"><span>PORTAL DE ACESSO</span><span className="c42-soon"><b/> EM PREPARAÇÃO</span></div>
  <h2 id="c42-access-heading">Sua jornada<br/>começa aqui<span>.</span></h2>
  <p>Um único ambiente, adaptado às permissões da sua conta.</p>
  <div className="c42-login">
   <label htmlFor="c42-email">E-mail de acesso</label>
   <input id="c42-email" type="email" placeholder="seu@email.com" disabled autoComplete="off"/>
   <label htmlFor="c42-code">Senha ou código de verificação</label>
   <input id="c42-code" type="text" placeholder="Acesso ainda indisponível" disabled autoComplete="off"/>
   <button type="button" disabled>Entrar no Complexo42 <span>↗</span></button>
   <small>Login desativado. Não informe credenciais reais aqui.</small>
  </div>
  <div className="c42-divider"><span>EXPERIMENTE A INTERFACE</span></div>
  <nav className="c42-roles" aria-label="Prévia de papel, sem autenticação">
   <Link href="/?preview=aluno#modulos" scroll={false} aria-current={preview==="aluno"?"page":undefined} className={preview==="aluno"?"selected":""}>Sou aluno</Link>
   <Link href="/?preview=professor#modulos" scroll={false} aria-current={preview==="professor"?"page":undefined} className={preview==="professor"?"selected":""}>Sou professor</Link>
  </nav>
  <p className="c42-preview-warning">Seleção visual com dados de exemplo. <strong>Não concede acesso</strong> a informações privadas.</p>
 </aside>;
}
