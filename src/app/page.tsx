import Image from "next/image";
import DisappearingText from "./components/DisappearingText";
import ScrollingCarousel from "./components/ScrollingCarousel";


export default function Home() {


  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col bg-[#0F101B]">
      <main className="min-h-180 h-screen w-screen flex items-center justify-center flex-row relative gap-120">
        <div className="h-fit z-10">
          <h1 className="text-8xl font-raleway-sans font-bold text-white">Filippo Grochala</h1>
          <div className="mt-2 relative">
            <p className="text-3xl opacity-70 font-sans text-white">Web and Mobile Developer since 2020</p>
            <p className="text-xl mt-2 opacity-60 font-sans text-white">On this page you will find everything you need to know about <br/>me, my skills, and my projects</p>
          </div>
          <div className="mt-4 min-w-fit relative flex flex-row items-center gap-2">
            <div className="flex flex-row gap-4 items-center bg-[#17192A] px-4 peer-16 rounded-2xl justify-center h-16 min-w-fit flex-shrink-0">
              <img className="h-10" src="https://skillicons.dev/icons?i=html,css,react,nodejs,typescript"></img>
              <div className="min-w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=androidstudio,flutter,kotlin"></img>
              <div className="min-w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=git,docker"></img>
              {/*<a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://it.fiverr.com/sellers/filippodude">Fiverr</a>
              <a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://t.me/FIlippodude">Telegram</a>*/}
            </div>
            <Image src="arrow1.svg" alt="Pointing Arrow" width={40} height={0}/>
            <button className="relative font-mono font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">CONNECT
              <Image className="absolute -top-3 -right-3" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
            </button>
            {/*<a className="w-full mt-2 rounded-3xl bg-[#425173] opacity-50 p-2 text-center text-white duration-200 hover:opacity-90 select-none cursor-grab" href="https://github.com/FilippoDude">Github</a>*/}
          </div>
        </div>
        <div></div>
        <DisappearingText><a className="absolute bottom-0 left-1 z-10 text-white opacity-50">Past Portfolio</a></DisappearingText>
      </main>
      <section className="relative min-h-180 h-screen w-screen overflow-hidden flex justify-center items-center  bg-[#131522] z-10">
        <h1 className="absolute z-0 text-white opacity-75 font-black font-raleway-sans italic text-[32rem]">SKILLS</h1>
        <div className="relative z-1 w-10/12 h-10/12 bg-[#1c2032BF] rounded-2xl flex items-center justify-center gap-10">
            <div className="relative w-68 h-80 bg-[#425173] flex flex-col items-center px-12 flex-shrink-0">
              <div>
                <h2 className=" mt-4 font-raleway-sans font-bold text-white text-4xl">Mobile Developer</h2>
                <p className="w-10/12  font-sans text-white opacity-85">Languages:</p>
                <p className="w-10/12 text-xl font-sans text-white">Kotlin, Dart</p>
                <p className="w-10/12 font-sans text-white opacity-85">Framerworks:</p>
                <p className="w-10/12 text-xl  font-sans text-white">Flutter</p>
              </div>
            </div>
            <div className="relative -mt-20 w-68 h-80 bg-[#E89947] flex flex-col items-center px-12 flex-shrink-0">
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
            <div className="mt-20 w-68 h-80 bg-[#2E3754] flex flex-col items-center px-12 flex-shrink-0">
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
        <h1 className="font-raleway-sans text-6xl font-black text-white">PAST EXPERIENCES</h1>
        <ScrollingCarousel></ScrollingCarousel>
        </div>
      </section>
    </div>
  );
}
