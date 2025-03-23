import Image from "next/image";
import DisappearingText from "./components/DisappearingText";


export default function Home() {

    
  return (
    <div className="min-h-screen max-w-screen overflow-hidden flex flex-col">
      <main className="h-screen w-screen flex items-center justify-center flex-col relative">
        <div className="absolute w-[110%] h-[110%] blur-md select-none ">
          <Image
            src="/bg.jpg"  
            alt="Background"
            layout="fill"       
            objectFit="cover"     
            objectPosition="center" 
          />
        </div>
        
        <h1 className="text-6xl z-10 text-white">Filippo</h1>
        <div className="mt-2 relative">
          <p className="text-2xl mt-2 opacity-60 text-white">Web Developer</p>
          <p className="animate-splash absolute -top-1 -right-10 rotate-12 opacity-80 text-white">Since 2020</p>
        </div>
        <div className="relative w-fit flex flex-col">
          <div className="mt-4 flex flex-row gap-2 ">
            <a className="rounded-4xl bg-[#00b22d] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://it.fiverr.com/sellers/filippodude">Fiverr</a>
            <a className="rounded-4xl bg-[#0088cc] p-2 opacity-50 text-white h-fit duration-200 hover:-translate-y-1 hover:opacity-90 cursor-grab select-none" href="https://t.me/FIlippodude">Telegram</a>
          </div>
          <a className="w-full mt-2 rounded-3xl bg-black opacity-50 p-2 text-center text-white duration-200 hover:opacity-90 select-none cursor-grab" href="https://github.com/FilippoDude">Github</a>
        </div>

        <DisappearingText><a className="absolute bottom-0 left-1 z-10 text-white opacity-50">Past Portfolio</a></DisappearingText>
        <DisappearingText><a className="absolute bottom-0 right-5 z-10 text-white opacity-50">Image</a></DisappearingText>
        
      </main>

      <section className="w-screen  flex justify-center items-center h-screen bg-black z-10">
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
