import Image from "next/image";
import DisappearingText from "./components/DisappearingText";


export default function Home() {

    
  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col bg-[#0F101B]">
      <main className="h-screen w-screen flex items-center justify-center flex-row relative gap-120">
        <div className="h-fit z-10">
          <h1 className="text-8xl font-raleway-sans font-bold text-white">Filippo Grochala</h1>
          <div className="mt-2 relative">
            <p className="text-3xl opacity-70 font-sans text-white">Web and Mobile Developer since 2020</p>
            <p className="text-xl mt-2 opacity-60 font-sans text-white">On this page you will find everything you need to know about <br/>me, my skills, and my projects</p>
          </div>
          <div className="mt-4 relative flex flex-row items-center gap-2">
            <div className="flex flex-row gap-4 items-center bg-[#17192A] px-4 peer-16 rounded-2xl justify-center h-16">
              <img className="h-10" src="https://skillicons.dev/icons?i=html,css,react,nodejs,typescript"></img>
              <div className="w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=androidstudio,flutter,kotlin"></img>
              <div className="w-0.5 h-10 bg-white opacity-70"/>
              <img className="h-10"  src="https://skillicons.dev/icons?i=git,docker"></img>
              {/*<a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://it.fiverr.com/sellers/filippodude">Fiverr</a>
              <a className="rounded-xl bg-[#2E3754] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://t.me/FIlippodude">Telegram</a>*/}
            </div>
            <Image src="arrow1.svg" alt="Pointing Arrow" width={40} height={0}/>
            <button className="relative font-mono font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">CONTACT
              <Image className="absolute -top-3 -right-3 hover:" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
            </button>
            {/*<a className="w-full mt-2 rounded-3xl bg-[#425173] opacity-50 p-2 text-center text-white duration-200 hover:opacity-90 select-none cursor-grab" href="https://github.com/FilippoDude">Github</a>*/}
          </div>
        </div>
        <div></div>
        <DisappearingText><a className="absolute bottom-0 left-1 z-10 text-white opacity-50">Past Portfolio</a></DisappearingText>
        
      </main>

      <section className="w-screen  flex justify-center items-center h-screen bg-[#131522] z-10">
        <div>
          <h1 className="text-4xl text-white">Programming Languages and Past Experiences</h1>
          <p className="text-xl text-white mt-2">Languages I&apos;ve worked with: Typescript, Python, Java, C++, C, Php.</p>
          <p className="text-xl text-white mt-2">I&apos;ve worked on many different projects ranging from static and React Websites to Telegram Bots and Miniapps.<br/></p>
          <p className="text-xl text-white mt-2">For my public projects check out my GitHub Page!</p>


        
        </div>
      </section>
    </div>
  );
}
