"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Project, ProjectCategory } from "./types";
import { projects } from "./data";
import ProjectPopup from "./components/project-popup";
import ProjectCard, { EarlierProjectRow } from "./components/project-card";
import { getRepoPushDates } from "../services/github-service";

type Filter = "All" | ProjectCategory;

const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
const filters: Filter[] = [
  "All",
  ...Array.from(new Set(sortedProjects.map((p) => p.category))),
];

const ProjectsPage = () => {
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [pushDates, setPushDates] = useState<Record<string, Date>>({});
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects =
    filter == "All"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category == filter);
  const visibleProjects = filteredProjects.filter((p) => !p.archived);
  const earlierProjects = filteredProjects.filter((p) => p.archived);

  useEffect(() => {
    getRepoPushDates()
      .then(setPushDates)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cards = projectRefs.current
      .slice(0, visibleProjects.length)
      .filter(Boolean);
    gsap.fromTo(
      cards,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 },
    );
  }, [filter]);

  const getUpdated = (project: Project) =>
    project.github ? pushDates[project.github.toLowerCase()] : undefined;

  return (
    <div className="relative min-h-screen max-w-screen overflow-x-hidden bg-[#0F101B]">
      {focusedProject && (
        <ProjectPopup
          closeProject={() => setFocusedProject(null)}
          project={focusedProject}
          updated={getUpdated(focusedProject)}
        />
      )}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-10 pb-20">
        <h1 className="font-raleway-sans text-6xl font-black text-white mt-32 sm:mt-40">
          Projects
        </h1>
        <p className="text-white opacity-70 text-xl mt-2 text-center max-w-150">
          Things I&apos;ve built, from full-stack web apps to Android widgets and
          3D experiments.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-2 mt-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-bold backdrop-blur-2xl duration-100 transition-colors ${filter == f ? "bg-[#E49D53] text-white" : "bg-[#425173b0] text-white opacity-80 hover:opacity-100"}`}
            >
              {f}
              <span className="ml-1.5 opacity-60">
                {f == "All"
                  ? sortedProjects.length
                  : sortedProjects.filter((p) => p.category == f).length}
              </span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 w-full max-w-320">
          {visibleProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              updated={getUpdated(project)}
              featured={filter == "All" && project.featured}
              onOpen={() => setFocusedProject(project)}
              innerRef={(el) => {
                projectRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        {earlierProjects.length > 0 ? (
          <div className="w-full max-w-320 mt-16">
            <h2 className="font-raleway-sans text-3xl font-black text-white">
              Earlier work
            </h2>
            <p className="text-white opacity-60 mt-1">
              Older and smaller projects, kept here as they are.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {earlierProjects.map((project) => (
                <EarlierProjectRow
                  key={project.slug}
                  project={project}
                  onOpen={() => setFocusedProject(project)}
                />
              ))}
            </div>
          </div>
        ) : null}
        <a
          href="https://github.com/FilippoDude"
          target="_blank"
          rel="noreferrer"
          className="mt-10 text-white opacity-70 hover:opacity-100 duration-100 underline underline-offset-4"
        >
          See everything on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectsPage;
