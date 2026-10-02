import { projects } from "@/data/hub";
import { projectFilterLinks } from "@/data/navigation";
import { withBasePath } from "@/lib/basePath";
import type { Project, ProjectFilter } from "@/types/project";
import styles from "./ProjectsSection.module.css";

interface ProjectsSectionProps {
  selectedFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
}

export function ProjectsSection({ selectedFilter, onFilterChange }: ProjectsSectionProps) {
  const visibleProjects = projects.filter(
    (project) => selectedFilter === "Todos" || project.showcase === selectedFilter,
  );

  return (
    <section id="vitrine" className={styles.section} aria-labelledby="vitrine-title">
      <div className="section-container">
        <div className={styles.header}>
          <div className="section-heading section-heading-light">
            <p className="eyebrow">Vitrine de soluções</p>
            <h2 id="vitrine-title">Ideias que já encontraram correnteza</h2>
            <p>
              Portfólios, festas, arte e cuidado. A ordem vem do arquivo central do hub.
            </p>
          </div>

          <ProjectFilter selectedFilter={selectedFilter} onFilterChange={onFilterChange} />
        </div>

        <div className={styles.grid}>
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectFilterProps {
  selectedFilter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
}

function ProjectFilter({ selectedFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className={styles.filters} role="group" aria-label="Filtrar soluções">
      {projectFilterLinks.map((item) => {
        const active = selectedFilter === item.filter;
        return (
          <button
            key={item.filter}
            type="button"
            aria-pressed={active}
            onClick={() => onFilterChange(active && item.filter !== "Todos" ? "Todos" : item.filter)}
          >
            {item.label} {active && item.filter !== "Todos" ? "×" : "+"}
          </button>
        );
      })}
      {selectedFilter !== "Todos" ? (
        <button type="button" onClick={() => onFilterChange("Todos")}>
          Limpar filtros
        </button>
      ) : null}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const content = (
    <>
      <div className={styles.cardTopline}>
        <span>{project.showcase === "Portfolios" ? "Portfólio" : project.showcase}</span>
        <span>{project.stack ?? project.status}</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardEyebrow}>{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className={styles.cardFooter}>
        <span>{project.pillar}</span>
        <span>{project.location}</span>
        {project.href ? <b aria-hidden="true">-&gt;</b> : null}
      </div>
    </>
  );

  if (project.href) {
    return (
      <a className={styles.card} data-featured={project.featured} href={withBasePath(project.href)}>
        {content}
      </a>
    );
  }

  return (
    <article className={styles.card} data-featured={project.featured}>
      {content}
    </article>
  );
}
