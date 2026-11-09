import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Complexo42 | Pessoas, equipes e execução",
  description: "Protótipo demonstrativo da plataforma colaborativa de desenvolvimento de talentos e incubação de equipes.",
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
