"use client";

import { useState } from "react";
import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { ImpactStrip } from "@/components/ImpactStrip/ImpactStrip";
import { ProjectsSection } from "@/components/Projects/ProjectsSection";
import { AgendaCultural } from "@/components/AgendaCultural/AgendaCultural";
import { SectionHistory } from "@/components/SectionHistory/SectionHistory";
import { SectionCommunity } from "@/components/SectionCommunity/SectionCommunity";
import { SectionPillars } from "@/components/SectionPillars/SectionPillars";
import { SectionParticipation } from "@/components/SectionParticipation/SectionParticipation";
import { Footer } from "@/components/Footer/Footer";
import type { ProjectFilter } from "@/types/project";

export function HomePageClient() {
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<ProjectFilter>("Todos");

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <ImpactStrip />
        <SectionPillars />
        <ProjectsSection
          selectedFilter={selectedProjectFilter}
          onFilterChange={setSelectedProjectFilter}
        />
        <AgendaCultural />
        <SectionHistory />
        <SectionParticipation />
        <SectionCommunity />
      </main>
      <Footer />
    </>
  );
}
