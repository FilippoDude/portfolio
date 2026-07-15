import { useEffect, useRef } from "react";
import { Project } from "../types";
import gsap from "gsap";
export default function ProjectPopup({
  project,
  closeProject,
}: {
  project: Project;
  closeProject: () => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const percentageRef = useRef<HTMLDivElement | null>(null);
  const percentageContainerRef = useRef<HTMLDivElement | null>(null);
  const onScroll = () => {
    const containerDiv = containerRef.current;
    const percentageDiv = percentageRef.current;
    const percentageContainerDiv = percentageContainerRef.current;
    if (!containerDiv || !percentageDiv || !percentageContainerDiv) return;

    const scrollPercentage =
      (containerDiv.scrollTop /
        (containerDiv.scrollHeight - containerDiv.clientHeight)) *
      100;

    console.log(percentageContainerDiv.clientHeight);
    percentageDiv.style.height =
      (scrollPercentage * percentageContainerDiv.clientHeight) / 100 + "px";
  };
  useEffect(() => {
    containerRef.current?.addEventListener("scroll", onScroll);
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 },
    );
  }, []);

  const closeWithFadeout = () => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          closeProject();
        },
      },
    );
  };
  return (
    <div
      ref={containerRef}
      className="z-20 overscroll-none top-0 fixed w-full py-10 overflow-y-scroll scrollbar-hide h-full bg-[#1111131a] backdrop-blur-2xl"
    >
      <div className=" w-full  relative flex items-center justify-center ">
        <div className="relative w-8/12 min-h-400 bg-[#1c2032d8] rounded-4xl h-full p-8 flex justify-end flex-row gap-2">
          <div className="h-full w-full ">{project.innerPage}</div>
          <div className="sticky top-1/12 h-fit flex flex-col gap-2">
            <button
              onClick={closeWithFadeout}
              className="font-raleway-sans text-6xl font-black text-white cursor-pointer"
            >
              X
            </button>
            <div
              ref={percentageContainerRef}
              className="w-10 h-200 bg-[#ffffff79] rounded-2xl overflow-hidden"
            >
              <div
                ref={percentageRef}
                className="bg-[#00000057] w-full h-10 duration-75"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
