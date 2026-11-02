import { useEffect, useRef } from "react";
import { Project } from "../types";
import gsap from "gsap";
import ClickableImage from "@/app/components/ClickableImage";
import {
  formatUpdated,
  ProjectLinks,
  ProjectPreview,
  TechChips,
} from "./project-card";

function GeneratedDetails({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-white opacity-80 text-lg">{project.description}</p>
      {project.highlights ? (
        <div>
          <h3 className="text-white font-bold text-xl">Highlights</h3>
          <ul className="mt-2 flex flex-col gap-1">
            {project.highlights.map((h) => (
              <li key={h} className="text-white opacity-80 flex gap-2">
                <span className="text-[#E49D53]">•</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {project.gallery ? (
        <div>
          <h3 className="text-white font-bold text-xl">Screenshots</h3>
          <div className="mt-3 flex flex-row flex-wrap gap-3">
            {project.gallery.map((image) => (
              <ClickableImage
                key={image.src}
                src={image.src}
                alt={image.alt}
                customCss="h-80 rounded-lg"
              />
            ))}
          </div>
        </div>
      ) : !project.innerPage ? (
        <ProjectPreview project={project} className="w-full aspect-video rounded-xl" />
      ) : null}
    </div>
  );
}

export default function ProjectPopup({
  project,
  updated,
  closeProject,
}: {
  project: Project;
  updated?: Date;
  closeProject: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const onScroll = () => {
    const containerDiv = containerRef.current;
    const progressDiv = progressRef.current;
    if (!containerDiv || !progressDiv) return;
    const scrollable = containerDiv.scrollHeight - containerDiv.clientHeight;
    progressDiv.style.width =
      (scrollable > 0 ? (containerDiv.scrollTop / scrollable) * 100 : 0) + "%";
  };

  const closeWithFadeout = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: closeProject,
    });
  };

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
    );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == "Escape") closeWithFadeout();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const updatedText = formatUpdated(updated);

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      onClick={closeWithFadeout}
      className="z-40 overscroll-none top-0 left-0 fixed w-full h-full py-6 sm:py-10 px-3 sm:px-6 overflow-y-scroll scrollbar-hide bg-[#000000b3] backdrop-blur-2xl"
    >
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div ref={progressRef} className="h-full w-0 bg-[#E49D53]" />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-5xl bg-[#1c2032] border border-[#ffffff15] rounded-3xl p-6 sm:p-10 flex flex-col gap-6"
      >
        <div className="flex flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2 text-xs">
              <span className="text-[#E49D53] font-bold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-white opacity-50">{project.year}</span>
              {updatedText ? (
                <span className="text-white opacity-50">· {updatedText}</span>
              ) : null}
            </div>
            <h2 className="font-raleway-sans font-black text-white text-4xl sm:text-5xl">
              {project.name}
            </h2>
            <p className="text-white opacity-70 text-lg">{project.tagline}</p>
          </div>
          <button
            onClick={closeWithFadeout}
            aria-label="Close"
            className="sticky top-0 shrink-0 w-12 h-12 rounded-full bg-[#00000050] hover:bg-[#00000080] text-white text-2xl font-black cursor-pointer duration-100"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <TechChips tech={project.tech} />
          <ProjectLinks project={project} />
        </div>
        <div className="w-full h-0.5 bg-white opacity-20 rounded-2xl" />
        {project.innerPage ? (
          <>
            {project.innerPage}
            {project.gallery || project.highlights ? (
              <GeneratedDetails project={project} />
            ) : null}
          </>
        ) : (
          <GeneratedDetails project={project} />
        )}
      </div>
    </div>
  );
}
