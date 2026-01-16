"use client";

import { useEffect, useRef, useState } from "react";

const SkillsSection = ({
  externalRef,
}: {
  externalRef: React.Ref<HTMLElement | null>;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={(el) => {
        ref.current = el;
        if (typeof externalRef === "function") {
          externalRef(el);
        } else if (externalRef) {
          externalRef.current = el;
        }
      }}
      className="relative min-h-180 h-fit py-20 xl:py-0 xl:h-screen w-screen overflow-hidden flex justify-center items-center  bg-[#131522] z-10"
    >
      <h1 className="absolute z-0 text-white opacity-75 font-black font-raleway-sans italic text-[32rem]">
        SKILLS
      </h1>
      <div className="relative z-1 w-10/12 h-fit py-20 xl:py-0 xl:h-10/12 bg-[#1c2032d8] rounded-2xl flex flex-wrap items-center justify-center gap-10 border-2 border-gray-500 ">
        <div
          className={`relative w-68 h-80 bg-[#425173d0] flex flex-col items-center px-12 flex-shrink-0 duration-750 transition-all ease-in-out ${isVisible ? " opacity-100" : "xl:mt-10 opacity-0"}`}
        >
          <div>
            <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">
              Mobile Developer
            </h2>
            <p className="w-10/12  font-sans text-white opacity-85">
              Languages:
            </p>
            <p className="w-10/12 text-xl font-sans text-white">Kotlin, Dart</p>
            <p className="w-10/12 font-sans text-white opacity-85">
              Framerworks:
            </p>
            <p className="w-10/12 text-xl  font-sans text-white">Flutter</p>
          </div>
        </div>
        <div
          className={`relative xl:-mt-20 w-68 h-80 bg-[#E89947] flex flex-col items-center px-12 flex-shrink-0 duration-500 transition-all ease-in-out ${isVisible ? "xl:-mt-20 opacity-100" : "xl:mt-0 opacity-0"}`}
        >
          <div>
            <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">
              Web Developer
            </h2>
            <p className="w-10/12  font-sans text-white opacity-85">
              Languages:
            </p>
            <p className="w-10/12 text-xl font-sans text-white">Typescript</p>
            <p className="w-10/12 font-sans text-white opacity-85">
              Framerworks:
            </p>
            <p className="w-10/12 text-xl  font-sans text-white">
              React, Angular
            </p>
            <p className="w-10/12  font-sans text-white opacity-85">
              Back-end:
            </p>
            <p className="w-10/12 text-xl font-sans text-white">
              Nodejs, Express
            </p>
          </div>
        </div>
        <div
          className={`xl:mt-20 w-68 h-80 bg-[#2E3754] flex flex-col items-center px-12 flex-shrink-0 duration-1000 transition-all ease-in-out ${isVisible ? "xl:mt-20 opacity-100" : "xl:mt-25 opacity-0"}`}
        >
          <div>
            <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">
              Bot & Scraper Developer
            </h2>
            <p className="w-10/12  font-sans text-white opacity-85">
              Platform:
            </p>
            <p className="w-10/12 text-xl font-sans text-white">Telegram</p>
            <p className="w-10/12  font-sans text-white opacity-85">
              Languages:
            </p>
            <p className="w-10/12 text-xl font-sans text-white">Python</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkillsSection;
