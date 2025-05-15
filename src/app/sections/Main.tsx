
'use client'
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
const MainSection = ({skillsSectionRef, aboutmeRef}: {skillsSectionRef: React.Ref<HTMLElement | null>, aboutmeRef: React.Ref<HTMLElement | null>}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);


    const scrollToSkills = () => {
        if (skillsSectionRef && typeof skillsSectionRef !== 'function' && skillsSectionRef.current) {
            skillsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAboutme = () => {
        if (aboutmeRef && typeof aboutmeRef !== 'function' && aboutmeRef.current) {
            aboutmeRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <main ref={ref}
        className={`min-h-180 h-screen w-screen flex items-center justify-center flex-row relative gap-120 transition-all duration-1000 ease-in-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
            <div className="h-fit z-10 px-10 xl:pl-0">
            <h1 className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white">Filippo Grochala</h1>
            <div className="mt-2 relative w-full flex flex-col items-center sm:items-start">
                <p className="text-3xl w-80 sm:w-fit text-center sm:text-left sm:text-3xl opacity-70 font-sans text-white">Web and Mobile Developer since 2020</p>
                <div>
                    <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl mt-2 opacity-60 font-sans text-white">On this page you will find everything you need to know about</p>
                    <p className="text-xl w-72 sm:w-fit text-center sm:text-left sm:text-xl font-sans text-white">
                        <button onClick={scrollToAboutme} className="group cursor-pointer text-[#E49D53]">me<div className="group-hover:w-full h-0.5 w-0 bg-[#E49D53] duration-100"></div></button>
                        <span className="opacity-80">, my </span>
                        <button onClick={scrollToSkills} className="group cursor-pointer text-[#D87B26]">skills<div className="group-hover:w-full h-0.5 w-0 bg-[#D87B26] duration-100"></div></button>
                        <span className="opacity-80">, and my </span>
                        <button onClick={() => window.location.href = 'https://github.com/FilippoDude'} className="group cursor-pointer text-[#425173]">projects<div className="group-hover:w-full h-0.5 w-0 bg-[#425173] duration-100"></div></button>
                    </p>
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
                <button onClick={() => window.location.href = 'https://t.me/FIlippodude'} className="relative mt-2 md:mt-0 font-sans font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">CONNECT
                <Image className="absolute -top-3 -right-3" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
                </button>
                {/*<a className="w-full mt-2 rounded-3xl bg-[#425173] opacity-50 p-2 text-center text-white duration-200 hover:opacity-90 select-none cursor-grab" href="https://github.com/FilippoDude">Github</a>*/}
            </div>
            </div>
            <div className="hidden md:flex"></div>
            {/*<DisappearingText><a className="absolute bottom-0 left-1 z-10 text-white opacity-50">Past Portfolio</a></DisappearingText>*/}
        </main>
    )
}   

export default MainSection