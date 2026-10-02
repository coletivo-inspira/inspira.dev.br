"use client";

import Image from "next/image";
import { useState } from "react";
import { hubConfig } from "@/data/hub";
import { mainNavLinks } from "@/data/navigation";
import { withBasePath } from "@/lib/basePath";
import styles from "./Header.module.css";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href={withBasePath("/#inicio")} className={styles.brand} onClick={closeMobileMenu}>
          <Image
            src={withBasePath("/image/logo/versao3.jpg")}
            alt=""
            width={44}
            height={44}
            className={styles.logoImage}
            priority
          />
          <span>+INSPIRA</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {mainNavLinks.map((item) => (
            <a key={`${item.label}-${item.href}`} href={withBasePath(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.cta} href={hubConfig.hudiPagesUrl}>
          Criar portfólio
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="menu-mobile"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="menu-mobile"
        className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ""}`}
        aria-label="Navegação mobile"
      >
        {mainNavLinks.map((item) => (
          <a
            key={`mobile-${item.label}-${item.href}`}
            href={withBasePath(item.href)}
            onClick={closeMobileMenu}
          >
            {item.label}
          </a>
        ))}
        <a href={hubConfig.hudiPagesUrl} onClick={closeMobileMenu}>
          Criar meu portfólio gratuito
        </a>
      </nav>
    </header>
  );
}
