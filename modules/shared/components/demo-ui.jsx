export function Icon({name}) {
 if (name==="arrow") return <span aria-hidden="true">↗</span>;
 if (name==="dot") return <span aria-hidden="true">●</span>;
 return <span aria-hidden="true">◆</span>;
}

export function Header({title, eyebrow, children}) {
 return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div><div className="heading-right">{children}</div></div>;
}

export function Tag({children}) {return <span className="tag">{children}</span>;}
