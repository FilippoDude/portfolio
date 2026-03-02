"use client";

import { useEffect, useRef, useState } from "react";
import WidgetsCrateProject from "./projects/widgets-crate";
import { Project } from "./types";
import ProjectPopup from "./components/project-popup";
import gsap from "gsap";
import { getLatestCommit } from "../services/github-service";
import PortoflioProject from "./projects/portfolio-crate";
import { PlanetsBackground } from "./components/planets-background";
const projects: Project[] = [
  {
    name: "Copypaste",
    description: "Copy and paste long text quickly between multiple devices!",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
    github: "copypaste",
  },
  {
    name: "Widgets Crate",
    description: "Small app",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
  },
  {
    name: "Portfolio",
    description: "Small app",
    backgroundImage: "",
    innerPage: <PortoflioProject />,
    github: "portfolio",
  },
];
const ProjectsPage = () => {
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const projectRefs = useRef<HTMLButtonElement[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(true);

  const playInAnimation = () => {
    for (let i = 0; i < projects.length; i++) {
      gsap.fromTo(
        projectRefs.current[i],
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, delay: 0.2 * i },
      );
    }
  };

  const getCommits = async () => {
    await Promise.all(
      projects.map(async (project) => {
        if (project.github)
          return (project.latestGithubCommit = new Date(
            Date.parse((await getLatestCommit(undefined, project.github)).date),
          ));
      }),
    );

    projects.sort((a, b) => {
      if (!a.latestGithubCommit) return 1;
      if (!b.latestGithubCommit) return -1;

      return b.latestGithubCommit.getTime() - a.latestGithubCommit.getTime();
    });
    console.log(projects);
    setLoadingProjects(false);
  };
  useEffect(() => {
    getCommits();
  }, []);
  useEffect(() => {
    playInAnimation();
  }, [loadingProjects]);

  const closeFocusedProject = () => {
    setFocusedProject(null);
  };
  const projectClicked = (project: Project) => {
    setFocusedProject(project);
  };

  return (
    <div>
      <div
        className={` min-h-fit h-screen max-w-screen flex items-center flex-col bg-[#000000]`}
      >
        <div className="absolute inset-0">
          <PlanetsBackground />
        </div>
        {focusedProject && (
          <ProjectPopup
            closeProject={closeFocusedProject}
            project={focusedProject}
          />
        )}
        <h1 className="z-10 font-raleway-sans text-6xl font-black text-white mt-40">
          Projects
        </h1>
        {loadingProjects ? (
          <></>
        ) : (
          <div className="flex flex-wrap mt-8 gap-2 max-w-320 justify-center">
            {projects.map((project, i) => {
              return (
                <button
                  onClick={() => {
                    projectClicked(project);
                  }}
                  key={i}
                  ref={(ref) => {
                    if (ref) projectRefs.current[i] = ref;
                  }}
                  className="relative flex flex-col p-4 bg-[#425173b0] rounded-2xl w-100 h-60 cursor-pointer z-0"
                >
                  <h1 className="text-white text-2xl">{project.name}</h1>
                  <p className="text-white">{project.description}</p>
                  <p className="text-white absolute left-4 bottom-4">
                    {project.latestGithubCommit
                      ? "Latest commit: " +
                        project.latestGithubCommit.toLocaleString()
                      : ""}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
