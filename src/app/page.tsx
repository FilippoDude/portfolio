import Image from "next/image";
import DisappearingText from "./components/DisappearingText";
import ScrollingCarousel from "./components/InfiniteSmartCarousel";
import ContactsButtons from "./components/ContactsButtons";


export default function Home() {


  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col bg-[#0F101B]">
      <main className="min-h-180 h-screen w-screen flex items-center justify-center flex-row relative gap-120">
        <div className="h-fit z-10 px-10 xl:pl-0">
          <h1 className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white">Filippo Grochala</h1>
          <div className="mt-2 relative w-full flex flex-col items-center sm:items-start">
            <p className="text-3xl w-80 sm:w-fit text-center sm:text-left sm:text-3xl opacity-70 font-sans text-white">Web and Mobile Developer since 2020</p>
            <div>
              <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl mt-2 opacity-60 font-sans text-white">On this page you will find everything you need to know about</p>
              <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl font-sans text-white"><button className="cursor-pointer text-[#E49D53]">me</button><span className="opacity-80">, my </span><button className="cursor-pointer text-[#D87B26]">skills</button><span className="opacity-80">, and my </span><button className="cursor-pointer text-[#425173]">projects</button></p>
            </div>
          </div>
          <div className="mt-4 min-w-fit relative flex flex-col md:flex-row items-center sm:items-start md:items-center gap-2">
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#17192A] px-4 py-4 sm:py-4 peer-16 rounded-2xl justify-center h-fit sm:h-16 min-w-fit flex-shrink-0">
              <img className="h-10" src="https://skillicons.dev/icons?i=html,css,react,nodejs,typescript"></img>
              <div className="hidden sm:flex min-w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=androidstudio,flutter,kotlin"></img>
              <div className="hidden sm:flex min-w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=git,docker"></img>
              {/*<a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://it.fiverr.com/sellers/filippodude">Fiverr</a>
              <a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://t.me/FIlippodude">Telegram</a>*/}
            </div>
            <Image className="hidden md:flex" src="arrow1.svg" alt="Pointing Arrow" width={40} height={0}/>
            <button className="relative mt-2 md:mt-0 font-sans font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">CONNECT
              <Image className="absolute -top-3 -right-3" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
            </button>
            {/*<a className="w-full mt-2 rounded-3xl bg-[#425173] opacity-50 p-2 text-center text-white duration-200 hover:opacity-90 select-none cursor-grab" href="https://github.com/FilippoDude">Github</a>*/}
          </div>
        </div>
        <div className="hidden md:flex"></div>
        <DisappearingText><a className="absolute bottom-0 left-1 z-10 text-white opacity-50">Past Portfolio</a></DisappearingText>
      </main>
      <section className="relative min-h-180 h-fit py-20 xl:py-0 xl:h-screen w-screen overflow-hidden flex justify-center items-center  bg-[#131522] z-10">
        <h1 className="absolute z-0 text-white opacity-75 font-black font-raleway-sans italic text-[32rem]">SKILLS</h1>
        <div className="relative z-1 w-10/12 h-fit py-20 xl:py-0 xl:h-10/12 bg-[#1c2032d8] rounded-2xl flex flex-wrap items-center justify-center gap-10 border-2 border-gray-500 ">
            <div className="relative w-68 h-80 bg-[#425173d0] flex flex-col items-center px-12 flex-shrink-0">
              <div>
                <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">Mobile Developer</h2>
                <p className="w-10/12  font-sans text-white opacity-85">Languages:</p>
                <p className="w-10/12 text-xl font-sans text-white">Kotlin, Dart</p>
                <p className="w-10/12 font-sans text-white opacity-85">Framerworks:</p>
                <p className="w-10/12 text-xl  font-sans text-white">Flutter</p>
              </div>
            </div>
            <div className="relative xl:-mt-20 w-68 h-80 bg-[#E89947] flex flex-col items-center px-12 flex-shrink-0">
              <div>
                <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">Web Developer</h2>
                <p className="w-10/12  font-sans text-white opacity-85">Languages:</p>
                <p className="w-10/12 text-xl font-sans text-white">Typescript</p>
                <p className="w-10/12 font-sans text-white opacity-85">Framerworks:</p>
                <p className="w-10/12 text-xl  font-sans text-white">NextJs, Vite</p>
                <p className="w-10/12  font-sans text-white opacity-85">Back-end:</p>
                <p className="w-10/12 text-xl font-sans text-white">Nodejs, Express</p>
              </div>
            </div>
            <div className="xl:mt-20 w-68 h-80 bg-[#2E3754] flex flex-col items-center px-12 flex-shrink-0">
              <div>
                <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">Bot & Scraper Developer</h2>
                <p className="w-10/12  font-sans text-white opacity-85">Platform:</p>
                <p className="w-10/12 text-xl font-sans text-white">Telegram</p>
                <p className="w-10/12  font-sans text-white opacity-85">Languages:</p>
                <p className="w-10/12 text-xl font-sans text-white">Python</p>
              </div>
            </div>
        </div>
      </section>
      <section className="relative min-h-180 w-full h-screen overflow-hidden bg-[#0F101B] flex flex-col items-center justify-center ">
      
        <div className="w-full flex flex-col items-center">
          <h1 className="px-10 sm:px-0 font-raleway-sans text-5xl sm:text-6xl font-black text-white opacity-80">PAST EXPERIENCES</h1>
          <ScrollingCarousel></ScrollingCarousel>
        </div>
      </section>

      <section className="relative min-h-180 w-full h-fit md:h-screen overflow-hidden bg-[#17192A] flex flex-row items-center justify-center gap-120">
        <div className="px-10 py-10 rounded-2xl flex flex-col w-225 ">
            <h1 className="font-raleway-sans text-6xl font-black text-white">About me</h1>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">Hi, I'm a developer based in Italy that focuses mainly on web and app development. I also like to try out new stuff that are not related to these two like making scrapers or Telegram bots or cool stuff that come to my mind.</p>
            <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">I've worked with many clients in the past, both from Fiverr and privately, on web and Telegram bot projects</p>
            <div className="w-10/12 mt-2 h-0.5 bg-white opacity-60 rounded-2xl"></div>
            <p className="text-xl mt-2 opacity-80 font-sans text-white">Outside of development I also like going to the gym, gaming, or just studying stuff i find interesting.</p>
            <ContactsButtons></ContactsButtons>
        </div>
      </section>

    </div>
  );
}
