import { Project } from "../types";

export function formatUpdated(date?: Date) {
  if (!date) return null;
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days < 1) return "Updated today";
  if (days < 30) return `Updated ${days} day${days == 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Updated ${months} month${months == 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `Updated ${years} year${years == 1 ? "" : "s"} ago`;
}

export function ProjectPreview({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  if (project.previewImage)
    return (
      <div className={`relative overflow-hidden bg-[#00000050] ${className}`}>
        {/* Blurred copy fills the frame so portrait screenshots don't leave empty bars */}
        <img
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-50 scale-110"
          src={project.previewImage}
          alt=""
        />
        <img
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 duration-500 transition-transform"
          src={project.previewImage}
          alt={`${project.name} preview`}
        />
      </div>
    );

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center bg-linear-to-br from-[#425173] via-[#293247] to-[#17192A] ${className}`}
    >
      <p className="font-raleway-sans font-black text-6xl text-white opacity-20 group-hover:opacity-40 duration-300 text-center px-4">
        {project.name}
      </p>
    </div>
  );
}

export function TechChips({
  tech,
  max = tech.length,
}: {
  tech: string[];
  max?: number;
}) {
  const hidden = tech.length - max;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.slice(0, max).map((t) => (
        <span
          key={t}
          className="text-xs text-white bg-[#00000050] px-2 py-1 rounded-md"
        >
          {t}
        </span>
      ))}
      {hidden > 0 ? (
        <span className="text-xs text-white opacity-60 px-2 py-1">
          +{hidden}
        </span>
      ) : null}
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-row gap-2">
      {project.projectLink ? (
        <a
          href={project.projectLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm bg-[#00000050] hover:bg-[#00000080] duration-100 text-white px-3 py-2 rounded-md"
        >
          Source code
        </a>
      ) : null}
      {project.demoLink ? (
        <a
          href={project.demoLink}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-sm bg-[#E49D53] hover:bg-[#D87B26] duration-100 text-white px-3 py-2 rounded-md"
        >
          Live project
        </a>
      ) : null}
    </div>
  );
}

export function EarlierProjectRow({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key == "Enter" || e.key == " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-5 py-4 rounded-xl bg-[#17192Ab0] hover:bg-[#293247b0] backdrop-blur-2xl border border-[#ffffff10] hover:border-[#E49D5360] cursor-pointer duration-200 transition-all text-left"
    >
      <div className="flex flex-row items-baseline gap-3 md:w-72 shrink-0">
        <span className="text-white opacity-50 text-sm w-10">
          {project.year}
        </span>
        <h3 className="font-raleway-sans font-bold text-white text-lg">
          {project.name}
        </h3>
      </div>
      <p className="text-white opacity-60 flex-1 text-sm">{project.tagline}</p>
      <div className="flex flex-row flex-wrap items-center gap-3">
        <span className="text-[#E49D53] text-xs font-bold uppercase tracking-wider">
          {project.category}
        </span>
        <ProjectLinks project={project} />
      </div>
    </div>
  );
}

export default function ProjectCard({
  project,
  updated,
  featured = false,
  onOpen,
  innerRef,
}: {
  project: Project;
  updated?: Date;
  featured?: boolean;
  onOpen: () => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const updatedText = formatUpdated(updated);
  return (
    <div
      ref={innerRef}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key == "Enter" || e.key == " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className={`group relative flex overflow-hidden rounded-2xl bg-[#425173b0] hover:bg-[#293247b0] backdrop-blur-2xl border border-[#ffffff15] hover:border-[#E49D5380] cursor-pointer duration-200 transition-all text-left ${featured ? "flex-col lg:flex-row lg:col-span-full" : "flex-col"}`}
    >
      <ProjectPreview
        project={project}
        className={
          featured ? "w-full aspect-video lg:w-3/5 lg:aspect-auto lg:min-h-80" : "w-full aspect-video"
        }
      />
      <div
        className={`flex flex-col gap-3 p-5 flex-1 ${featured ? "lg:p-8 lg:justify-center" : ""}`}
      >
        <div className="flex flex-row items-center gap-2 text-xs">
          {featured ? (
            <span className="bg-[#E49D53] text-white font-bold px-2 py-1 rounded-md">
              Featured
            </span>
          ) : null}
          <span className="text-[#E49D53] font-bold uppercase tracking-wider">
            {project.category}
          </span>
          <span className="text-white opacity-50">{project.year}</span>
        </div>
        <h2
          className={`font-raleway-sans font-black text-white ${featured ? "text-4xl" : "text-2xl"}`}
        >
          {project.name}
        </h2>
        <p className="text-white opacity-75 flex-1">
          {featured ? project.description : project.tagline}
        </p>
        <TechChips tech={project.tech} max={featured ? project.tech.length : 4} />
        <div className="flex flex-row flex-wrap items-center justify-between gap-2 mt-1">
          <ProjectLinks project={project} />
          {updatedText ? (
            <span className="text-xs text-white opacity-50">{updatedText}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
