import type { Metadata } from "next";
import localFont from "next/font/local";
import { withBasePath } from "@/lib/basePath";
import { DotTrail } from "@/components/DotTrail/DotTrail";
import "./globals.css";

const syne = localFont({
  src: "../fonts/syne-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "700 800",
});

const dmSans = localFont({
  src: "../fonts/dm-sans-latin.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "400 700",
});

export const metadata: Metadata = {
  title: "Coletivo Inspira | inspira.dev.br",
  description:
    "Coletivo Inspira: arte, cultura, tecnologia e ecoturismo conectando pessoas e projetos em Bonito-MS.",
  icons: { icon: withBasePath("/image/logo/plus.svg") },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <DotTrail />
      </body>
    </html>
  );
}
