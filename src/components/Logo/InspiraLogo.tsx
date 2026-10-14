import styles from "./InspiraLogo.module.css";

export interface InspiraLogoProps {
  variant?: "full" | "transparent" | "badge";
  className?: string;
  showSubtitle?: boolean;
  animated?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * Logo vetorial oficial +INSPIRA COLETIVO.
 * Bloco lima (#BAFF29), estrutura floresta (#133824) e nós menta (#A3E5C2).
 */
export function InspiraLogo({
  variant = "transparent",
  className = "",
  showSubtitle = true,
  animated = false,
  "aria-hidden": ariaHidden,
}: InspiraLogoProps) {
  const includeSubtitle = showSubtitle && variant !== "badge";
  const viewBox =
    variant === "full"
      ? "0 0 1000 1000"
      : includeSubtitle
        ? "120 185 760 635"
        : "120 190 755 510";

  const classNames = [styles.root, animated ? styles.animated : "", className]
    .filter(Boolean)
    .join(" ");
  const isDecorative = ariaHidden === true || ariaHidden === "true";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      className={classNames}
      role={isDecorative ? undefined : "img"}
      aria-hidden={isDecorative ? true : undefined}
      aria-label={isDecorative ? undefined : "+INSPIRA COLETIVO"}
    >
      {variant === "full" && (
        <g className={styles.layerBg}>
          <defs>
            <pattern
              id="inspira-dots"
              x="63"
              y="32"
              width="31.214"
              height="32.275"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="3" r="2.8" fill="#D2D4D0" />
            </pattern>
          </defs>
          <rect width="1000" height="1000" fill="#F6F6F3" />
          <rect x="60" y="29" width="882" height="944" fill="url(#inspira-dots)" />
        </g>
      )}

      <g className={styles.layerPlus}>
        <rect x="133" y="238" width="196" height="196" fill="#BAFF29" />
        <path
          d="M208 257H254V313H310V359H254V415H208V359H152V313H208V257Z"
          fill="#133824"
        />
      </g>

      <g fill="#133824">
        <rect className={styles.letter} x="346" y="229" width="63" height="216" />
        <path
          className={styles.letter}
          d="M437 229H497L572 349V229H631V445H571L496 319V445H437V229Z"
        />
        <path
          className={styles.letter}
          d="M833 290L773 294C770 276 758 267 742 267C724 267 714 275 714 287C714 299 726 304 756 311C805 322 840 338 840 382C840 427 803 450 746 450C686 450 654 422 651 376L712 373C715 395 728 407 748 407C767 407 779 398 779 385C779 371 767 366 734 358C688 347 658 331 658 289C658 248 693 225 744 225C798 225 829 250 833 290Z"
        />
        <path
          className={styles.letter}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M146 464H252C298 464 327 491 327 533C327 575 298 602 252 602H210V680H146V464ZM210 510V557H244C258 557 266 548 266 533.5C266 519 258 510 244 510H210Z"
        />
        <rect className={styles.letter} x="346" y="464" width="63" height="216" />
        <path
          className={styles.letter}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M437 464H548C592 464 618 489 618 528C618 556 604 575 581 583L631 680H564L525 595H499V680H437V464ZM499 510V550H536C549 550 557 542 557 530C557 518 549 510 536 510H499Z"
        />
        <path
          className={styles.letter}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M711 464H781L855 667H842V680H793L782 642H711L700 680H647L711 464ZM746 520L725 596H768L746 520Z"
        />
      </g>

      <g fill="#A3E5C2">
        <rect className={styles.node} x="371" y="198" width="15" height="15" />
        <rect className={styles.node} x="371" y="431" width="14" height="47" />
        <rect className={styles.node} x="136" y="454" width="22" height="22" />
        <path className={styles.node} d="M220 521H228A12.5 12.5 0 0 1 228 546H220V521Z" />
        <rect className={styles.node} x="305" y="453" width="15" height="15" />
        <rect className={styles.node} x="315" y="463" width="6" height="6" />
        <rect className={styles.node} x="318" y="466" width="15" height="15" />
        <rect className={styles.node} x="135" y="669" width="23" height="23" />
        <rect className={styles.node} x="221" y="665" width="15" height="15" />
        <path className={styles.node} d="M572 272V293C555 293 545 284 545 272H572Z" />
        <rect className={styles.node} x="620" y="218" width="22" height="23" />
        <rect className={styles.node} x="620" y="433" width="22" height="23" />
        <rect className={styles.node} x="741" y="214" width="20" height="20" />
        <rect className={styles.node} x="761" y="218" width="57" height="5" />
        <path className={styles.node} d="M818 214H851V247H833V232H818V214Z" />
        <rect className={styles.node} x="841" y="247" width="5" height="33" />
        <rect className={styles.node} x="832" y="280" width="20" height="20" />
        <rect className={styles.node} x="640" y="365" width="22" height="22" />
        <path className={styles.node} d="M737 368C748 368 756 376 756 387C745 387 737 379 737 368Z" />
        <rect className={styles.node} x="832" y="363" width="20" height="20" />
        <rect className={styles.node} x="841" y="383" width="5" height="51" />
        <rect className={styles.node} x="838" y="424" width="16" height="14" />
        <rect className={styles.node} x="825" y="433" width="16" height="16" />
        <rect className={styles.node} x="426" y="669" width="23" height="23" />
        <path className={styles.node} d="M509 518H518A11.5 11.5 0 0 1 518 541H509V518Z" />
        <path
          className={styles.node}
          d="M592 489C592 483.5 596.5 479 602 479C608 479 612 473 612 461H629C629 475 621 482 611 487C611 494 606.5 499 601 499C595.5 499 592 494.5 592 489Z"
        />
        <path className={styles.node} d="M626 485L636 474H642V491H626V485Z" />
        <path className={styles.node} d="M510 680A13 13 0 0 1 536 680H510Z" />
        <rect className={styles.node} x="739" y="575" width="16" height="16" />
        <path
          className={styles.node}
          d="M805 553H820V556C823 554 826 549 826 545C826 541 829 538 833 538C836 538 838 534 839 530C841 527 846 527 847 531C848 535 843 538 840 543C839 549 836 555 830 555C825 555 822 559 820 564V569H805V553Z"
        />
        <rect className={styles.node} x="842" y="669" width="23" height="23" />
      </g>

      {includeSubtitle && (
        <g className={styles.layerColetivo} fill="#133824">
          <path d="M213 752H199C196 742 189 737 180 737C167 737 159 748 159 765C159 782 167 793 180 793C189 793 196 788 199 778H213C209 795 197 805 180 805C158 805 145 789 145 765C145 741 158 725 180 725C197 725 209 735 213 752Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M295.5 725C317.5 725 332 741 332 765C332 789 317.5 805 295.5 805C273.5 805 259 789 259 765C259 741 273.5 725 295.5 725ZM295.5 737C282 737 273 748 273 765C273 782 282 793 295.5 793C309 793 318 782 318 765C318 748 309 737 295.5 737Z"
          />
          <path d="M365 727H379V791H413V803H365V727Z" />
          <path d="M450 727H503V739H464V759H499V771H464V791H503V803H450V727Z" />
          <path d="M547 727H605V739H583V803H569V739H547V727Z" />
          <rect x="635" y="727" width="14" height="76" />
          <path d="M689 727H704L722 786L740 727H755L729 803H715L689 727Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M820 725C842 725 856.5 741 856.5 765C856.5 789 842 805 820 805C798 805 783.5 789 783.5 765C783.5 741 798 725 820 725ZM820 737C806.5 737 797.5 748 797.5 765C797.5 782 806.5 793 820 793C833.5 793 842.5 782 842.5 765C842.5 748 833.5 737 820 737Z"
          />
        </g>
      )}
    </svg>
  );
}
