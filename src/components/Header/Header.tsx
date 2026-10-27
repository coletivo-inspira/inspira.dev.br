"use client";

import { useState } from "react";
import { mainNavLinks } from "@/data/navigation";
import { withBasePath } from "@/lib/basePath";
import styles from "./Header.module.css";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a
          href={withBasePath("/#inicio")}
          className={styles.brand}
          aria-label="+INSPIRA"
          onClick={closeMobileMenu}
        >
          <span className={styles.plus} aria-hidden="true">
            <svg viewBox="0 0 196 196">
              <rect width="196" height="196" fill="#BAFF29" />
              <path
                d="M75 19 H121 V75 H177 V121 H121 V177 H75 V121 H19 V75 H75 V19 Z"
                fill="#133824"
              />
            </svg>
          </span>
          <span aria-hidden="true">INSPIRA</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Navegação principal">
          {mainNavLinks.map((item) => (
            <a key={`${item.label}-${item.href}`} href={withBasePath(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

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
      </nav>
    </header>
  );
}
