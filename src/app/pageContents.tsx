import ScrollingCarousel from "./components/InfiniteSmartCarousel";
import ContactsButtons from "./components/ContactsButtons";
import MainSection from "./sections/Main";
import SkillsSection from "./sections/Skills";
import { useRef } from "react";


export default function HomeContents() {
  const skillsSectionRef = useRef<HTMLDivElement|null>(null)
  const aboutmeSectionRef = useRef<HTMLDivElement|null>(null)
  return (
      
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col bg-[#0F101B]">
    <MainSection skillsSectionRef={skillsSectionRef} aboutmeRef={aboutmeSectionRef}></MainSection>
    <SkillsSection externalRef={skillsSectionRef}></SkillsSection>
    <section className="relative min-h-180 w-full h-screen overflow-hidden bg-[#0F101B] flex flex-col items-center justify-center ">
        <div className="w-full flex flex-col items-center">
        <h1 className="px-10 sm:px-0 font-raleway-sans text-5xl sm:text-6xl font-black text-white opacity-80">PAST EXPERIENCES</h1>
        <ScrollingCarousel></ScrollingCarousel>
        </div>
    </section>
    <section ref={aboutmeSectionRef} className="relative min-h-180 w-full h-fit md:h-screen overflow-hidden bg-[#17192A] flex flex-row items-center justify-center gap-120">
        <div className="px-10 py-10 rounded-2xl flex flex-col w-225 ">
            <h1 className="font-raleway-sans text-6xl font-black text-white">About me</h1>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">Hi, I&apos;m a developer based in Italy that focuses mainly on web and app development. I also like to try out new stuff that are not related to these two like making scrapers or Telegram bots or cool stuff that come to my mind.</p>
            <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">I&apos;ve worked with many clients in the past, both from Fiverr and privately, on web and Telegram bot projects</p>
            <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">Outside of development I also like going to the gym, gaming, or just studying stuff i find interesting.</p>
            <ContactsButtons></ContactsButtons>
        </div>
    </section>

    </div>
  );
}
