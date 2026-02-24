"use client";

import { useEffect, useRef, useState } from "react";
import WidgetsCrateProject from "./projects/widgets-crate";
import { Project } from "./types";
import ProjectPopup from "./components/project-popup";
import gsap from "gsap";
const projects: Project[] = [
  {
    name: "Widgets Crate",
    description: "Small app",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
  },
  {
    name: "Widgets Crate",
    description: "Small app",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
  },
  {
    name: "Widgets Crate",
    description: "Small app",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
  },
  {
    name: "Widgets Crate",
    description: "Small app",
    backgroundImage: "",
    innerPage: <WidgetsCrateProject />,
  },
];
const ProjectsPage = () => {
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const projectRefs = useRef<HTMLButtonElement[]>([]);
  const animationPlayingRef = useRef<boolean>(false);

  const playInAnimation = () => {
    for (let i = 0; i < projects.length; i++) {
      gsap.fromTo(
        projectRefs.current[i],
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, delay: 0.2 * i },
      );
    }
  };

  useEffect(() => {
    playInAnimation();
  }, []);

  const closeFocusedProject = () => {
    setFocusedProject(null);
  };
  const projectClicked = (project: Project) => {
    setFocusedProject(project);
  };

  return (
    <div className={``}>
      <div
        className={` min-h-400 max-w-screen flex items-center justify-center flex-col bg-[#0F101B]`}
      >
        {focusedProject && (
          <ProjectPopup
            closeProject={closeFocusedProject}
            project={focusedProject}
          />
        )}
        <h1 className="font-raleway-sans text-6xl font-black text-white">
          Projects
        </h1>
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
                className="flex flex-col p-4 bg-[#42517340] rounded-2xl w-100 h-60 cursor-pointer z-0"
              >
                <h1 className="text-white text-2xl">{project.name}</h1>
                <p className="text-white">{project.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
