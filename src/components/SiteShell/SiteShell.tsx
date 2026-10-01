import type { ReactNode } from "react";

import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
    </>
  );
}
