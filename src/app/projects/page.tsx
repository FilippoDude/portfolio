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
import { exitCode } from "process";

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
    projectLink: "https://github.com/FilippoDude/copypaste",
    demoLink: "https://copypaste.filippodude.com",
    priority: 3
  },
  {
    name: "Widgets Crate",
    description: "An app for android containing widgets.",
    backgroundImage: "",  
    previewImage: "",
    usedTech: [],
    innerPage: <WidgetsCrateProject />,
    projectLink: "https://github.com/FilippoDude/widgetscrate",
    demoLink: "https://widgetscrate.filippodude.com",
    priority: 1
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
    projectLink: "https://github.com/FilippoDude/portfolio",
    demoLink: "https://filippodude.com",
    priority: 2
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
    try {
    await Promise.all(
      projects.map(async (project) => {
        if (project.github)
          return (project.latestGithubCommit = new Date(
            Date.parse((await getLatestCommit(undefined, project.github)).date),
          ));
      }),
    );
  } catch(e){

  }

/*    projects.sort((a, b) => {
      if (!a.latestGithubCommit) return 1;
      if (!b.latestGithubCommit) return -1;
      console.log()
      return b.latestGithubCommit.getTime() - a.latestGithubCommit.getTime();
    });
*/
    
    projects.sort((a, b) => {
      if (!a.priority) return 1;
      if (!b.priority) return -1;
      return a.priority - b.priority;
    });

    setLoadingProjects(false);
  };
  useEffect(() => {
    getCommits();
  }, [projectRefs.current]);
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
    <div className="bg-[#000000]">
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
          <div className="flex mb-10 flex-wrap mt-8 gap-2 max-w-320 justify-center">
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
                  <p className="text-white opacity-75 text-left h-full">
                    {project.description}
                  </p>

                  <div className="relative w-full mt-1">
                    <div className="w-full flex flex-col">
                      <div className="relative h-12 flex flex-row gap-2 w-full bg-[#00000050] p-2 rounded-md">
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
                      <div className="flex flex-row mt-2 gap-2">
                        <span className="bg-[#00000050] text-nowrap text-white p-2 rounded-md">Source code</span>
                        <span className=" bg-[#E49D53] w-full text-nowrapbg-[#00000050] text-white p-2 rounded-md">Live project</span>
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
