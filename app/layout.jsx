import "./globals.css";
import "./home.css";
export const metadata={
 title:"Complexo42 | Formação, pessoas e projetos",
 description:"Ambiente experimental de formação, equipes e entregas. Prévia sem dados pessoais.",
 robots:{index:false,follow:false}
};
export default function RootLayout({children}){
 return <html lang="pt-BR"><body>{children}</body></html>;
}
