"use client";

import { useEffect, useRef, useState } from "react";
import WidgetsCrateProject from "./projects/widgets-crate";
import { BaseTechTypes, Project } from "./types";
import ProjectPopup from "./components/project-popup";
import gsap from "gsap";
import { getLatestCommit } from "../services/github-service";
import PortoflioProject from "./projects/portfolio";
import { PlanetsBackground } from "./components/planets-background";
import CopypasteProject from "./projects/copypaste";

const projects: Project[] = [
  {
    name: "Copypaste",
    description: "Copy and paste long text quickly between multiple devices!",
    backgroundImage: "",
    previewImage: "/copypaste-project/main-menu.png",
    innerPage: <CopypasteProject />,
    usedTech: [
      BaseTechTypes.react,
      BaseTechTypes.node,
      BaseTechTypes.typescript,
    ],
    github: "copypaste",
  },
  {
    name: "Widgets Crate",
    description: "An app for android containing widgets.",
    backgroundImage: "",
    previewImage: "",
    usedTech: [BaseTechTypes.android],
    innerPage: <WidgetsCrateProject />,
  },
  {
    name: "Portfolio",
    description: "The website you are looking at right now.",
    backgroundImage: "",
    previewImage: "/portfolioPreview.png",
    innerPage: <PortoflioProject />,
    usedTech: [
      BaseTechTypes.react,
      BaseTechTypes.node,
      BaseTechTypes.typescript,
    ],
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
        <h1 className="z-10 px-20 py-4 rounded-2xl font-raleway-sans text-6xl font-black text-white mt-40">
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
                  className="relative flex flex-col p-4 bg-[#425173b0] rounded-xl w-100 h-100 cursor-pointer z-0 hover:bg-[#293247b0] duration-100 transition-all backdrop-blur-2xl"
                >
                  {project.previewImage ? (
                    <img
                      className="rounded-md"
                      src={project.previewImage}
                      alt="preview image"
                    />
                  ) : null}
                  <h1 className="text-white text-2xl mt-2 text-left">
                    {project.name}
                  </h1>
                  <p className="text-white opacity-75 text-left">
                    {project.description}
                  </p>

                  <div className="relative w-full h-full">
                    <div className="w-full absolute bottom-0 flex flex-col">
                      <div className="absolute bottom-8 h-12 flex flex-row gap-2 w-full bg-[#fff45ee8] p-2 rounded-md">
                        {project.usedTech.map((el) => {
                          return (
                            <img
                              className="max-w-8"
                              src={el.logoImageSrc}
                              alt={el.displayName}
                            />
                          );
                        })}
                      </div>

                      <p className="text-[#E49D53]">
                        {project.latestGithubCommit
                          ? "Latest commit: " +
                            project.latestGithubCommit.toLocaleString()
                          : ""}
                      </p>
                    </div>
                  </div>
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
