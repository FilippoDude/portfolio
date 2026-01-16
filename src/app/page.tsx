"use client";
import { useRef } from "react";
import ScrollingCarousel from "./components/InfiniteSmartCarousel";
import MainSection from "./components/sections/Main";
import SkillsSection from "./components/sections/Skills";
import ContactsButtons from "./components/ContactsButtons";
import Laptop3d from "./components/Laptop3d";

export default function Home() {
  const skillsSectionRef = useRef<HTMLDivElement | null>(null);
  const aboutmeSectionRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col bg-[#0F101B]">
      <MainSection
        skillsSectionRef={skillsSectionRef}
        aboutmeRef={aboutmeSectionRef}
      ></MainSection>
      <SkillsSection externalRef={skillsSectionRef}></SkillsSection>
      {/*<section className="relative min-h-180 w-full h-screen overflow-hidden bg-[#0F101B] flex flex-col items-center justify-center ">
          <div className="w-full flex flex-col items-center">
          <h1 className="px-10 sm:px-0 font-raleway-sans text-5xl sm:text-6xl font-black text-white opacity-80">PAST EXPERIENCES</h1>
          <ScrollingCarousel></ScrollingCarousel>
          </div>
      </section>
      */}
      <section
        ref={aboutmeSectionRef}
        className="relative min-h-180 w-full h-fit md:h-screen overflow-hidden bg-[#17192A] flex flex-row items-center justify-center gap-120"
      >
        <div className="blur-[8px] w-full h-full absolute ">
          <Laptop3d />
        </div>
        <div className=" px-10 py-10 rounded-2xl flex flex-col w-225 z-10">
          <h1 className="font-raleway-sans text-6xl font-black text-white">
            About me
          </h1>
          <p className="text-xl mt-2 opacity-80 font-sans text-white">
            Hi, I&apos;m a developer based in Italy that focuses mainly on web
            and app development. I've gone to an IT focused school and in
            general technology plays a big role in my life.
          </p>
          <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
          <p className="text-xl mt-2 opacity-80 font-sans text-white">
            I&apos;ve worked with clients in the past on web and Telegram bot
            projects, both from Fiverr and privately.
          </p>
          <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
          <p className="text-xl mt-2 opacity-80 font-sans text-white">
            Outside of development I also like going to the gym, gaming, and
            doing 3d models.
          </p>

          <div className="flex flex-row gap-4 items-center">
            <ContactsButtons></ContactsButtons>
            <button className="bg-[#91ff00] py-2 h-fit mt-2 w-30 rounded-sm text-black font-sans font-bold opacity-80 cursor-pointer">
              W.I.P
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
