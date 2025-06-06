
'use client'
import Image from "next/image"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle);

const ArrowWithText = ({text} : {text: string}) => {
    return(<>
        <div className="relative mt-4 flex flex-col items-center">
            <div className="relative h-40 w-20 opacity-70">
                <Image src={"/hollowArrow.svg"} alt="hollowArrow" fill={true}></Image>
                <Image src={"/hollowArrow.svg"} alt="hollowArrow" fill={true}></Image>
            </div>
            <p className="top-16.5 absolute whitespace-nowrap text-white font-bold opacity-70">{text}</p>
        </div>
    </>)
}

const Timeline = forwardRef((props, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const internalRef = useRef<HTMLDivElement | null>(null)
    const toggleVisibility = () => {
        if(!isVisible){
            gsap.set(internalRef.current, {
                display: "flex"
            });
            setIsVisible(true)
        } else {
            gsap.to(internalRef.current, {
                display: "none"
            })
            setIsVisible(false)
        }
    }

    useImperativeHandle(ref, () => ({
        toggleVisibility,
    }));

    return(
        <div ref={internalRef} className="hidden xl:relative z-50 bg-[#000000] xl:bg-[#00000060] fixed w-full xl:w-160 h-full xl:flex flex-col items-center overflow-y-scroll py-20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button onClick={toggleVisibility} className="absolute top-2 left-2 w-20 h-20 bg-[#FFFFFF10] rounded-2xl z-30"></button>
            <div className="absolute bg-[#FFFFFF40] opacity-10 w-full -mt-10 h-680 md:flex blur-md "></div>
            <div className="relative flex flex-col gap-2 items-center">
                <p className="text-[#FFFFFF] font-raleway-sans font-bold text-3xl opacity-100" >Current Position</p>
                <div className="relative w-40 h-40 mt-2">
                    <Image className="blur-2xl" src={"/polarisLogo.svg"} fill={true} alt="Polaris Logo"></Image>
                    <Image src={"/polarisLogo.svg"} fill={true} alt="Polaris Logo"></Image>
                </div>
                <p className="text-[#FFFFFF] font-raleway-sans text-3xl mt-2 font-bold" >Polaris</p>
                <p className="text-[#FFFFFF] font-raleway-sans text-xl opacity-50" >Front-End Developer</p>
                
            </div>
            <div className="mt-10">
                <p className="absolute text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold blur-md">Obtained position in Polaris as Front-End Developer</p>
                <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold">Obtained position in Polaris as Front-End Developer</p>
            </div>
            
            <ArrowWithText text="2 June 2025"/>
            <div>
                <p className="absolute text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold blur-md">Current portfolio is first published</p>
                <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold">Current portfolio is first published</p>
            </div>
            <ArrowWithText text="15 May 2025"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Made small 3d demo website</p>
            <ArrowWithText text="21 May 2025"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Published Beta Widgets Crate App on Github</p>
            <ArrowWithText text="29 April 2025"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Competed in Cyberchallenge finals in Turin</p>
            <ArrowWithText text="29 July 2024"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Trinity B2.1 Certification</p>
            <ArrowWithText text="May of 2024"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Started doing freelance work</p>
            <ArrowWithText text="2024"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Got past school selection in Olyciber</p>
            <ArrowWithText text="December of 2023"/>
            <div>
                <p className="absolute text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold blur-md">First look into web development</p>
                <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold">First look into web development</p>
            </div>
            <ArrowWithText text="2022"/>
            <p className="text-[#FFFFFF] font-raleway-sans text-xl mt-4 font-bold opacity-80">Small game dev experience</p>
            <ArrowWithText text="2020 - 2021"/>
            <div>
                <p className="absolute text-[#FFFFFF] font-raleway-sans text-4xl mt-10 font-bold blur-2xl">JOURNEY BEGINS</p>
                <p className="text-[#FFFFFF] font-raleway-sans text-4xl mt-10 font-bold">JOURNEY BEGINS</p>
            </div>
        </div>
    )
})

const MainSection = ({skillsSectionRef, aboutmeRef}: {skillsSectionRef: React.Ref<HTMLElement | null>, aboutmeRef: React.Ref<HTMLElement | null>}) => {
    const titleBlurRef = useRef<HTMLHeadingElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const timelineRef = useRef<{ toggleVisibility: () => void } | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(titleBlurRef.current != null){
            gsap.from(titleRef.current, {
                duration:1,
                ease: CustomWiggle.create("myWiggle", {
                wiggles:10,
                type:"easeInOut"
                }),
                opacity: 1
            })
            gsap.from(titleBlurRef.current, {
                duration:1,
                ease: CustomWiggle.create("myWiggle", {
                wiggles:10,
                type:"easeInOut"
                }),
                color: "#FFFFFF"
            })
        }

        if(subtitleRef.current != null){
            gsap.to(subtitleRef.current, {
                delay: 1,
                opacity: 1
            });
        }
        

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

    const showTimelineClick = () => {
        if(timelineRef.current != null){
            timelineRef.current.toggleVisibility();
        }
    }

    return(
        <main ref={ref} className={`min-h-180 h-screen w-screen flex items-center justify-center flex-row relative gap-40 transition-all duration-1000 ease-in-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="h-fit z-10 px-10 xl:pl-0">
                <div className="relative">
                    <h1 ref={titleRef} className="select-none absolute text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white blur-xs opacity-0">Filippo Grochala</h1>
                    <h1 ref={titleBlurRef} className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-[#FFFFFF20]">Filippo Grochala</h1>
                </div>
                <div className="mt-2 relative w-full flex flex-col items-center sm:items-start">
                    <div ref={subtitleRef} className="relative opacity-50 ">
                        <p className="absolute text-3xl w-80 sm:w-fit text-center sm:text-left sm:text-3xl opacity-70 font-sans text-white blur-xs select-none">Web and Mobile Developer since 2020</p>
                        <p className="text-3xl w-80 sm:w-fit text-center sm:text-left sm:text-3xl opacity-70 font-sans text-white">Web and Mobile Developer since 2020</p>
                    </div>
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
                <div className="flex items-center flex-col sm:items-start">
                    <div className="mt-4 min-w-fit relative flex flex-col md:flex-row items-center sm:items-start md:items-center gap-2">
                        <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#17192A] px-4 py-4 sm:py-4 peer-16 rounded-2xl justify-center h-fit sm:h-16 min-w-fit flex-shrink-0">
                        <img className="h-10" src="https://skillicons.dev/icons?i=html,css,react,nodejs,typescript"></img>
                        <div className="hidden sm:flex min-w-0.5 h-10 bg-white opacity-70"/>
                        <img className="h-10"  src="https://skillicons.dev/icons?i=androidstudio,flutter,kotlin"></img>
                        <div className="hidden sm:flex min-w-0.5 h-10 bg-white opacity-70"/>
                        <img className="h-10"  src="https://skillicons.dev/icons?i=git,docker"></img>
                        </div>
                        <Image className="hidden md:flex" src="arrow1.svg" alt="Pointing Arrow" width={40} height={0}/>
                        <button onClick={() => window.location.href = 'https://t.me/FIlippodude'} className="relative mt-2 md:mt-0 font-sans font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">CONNECT
                            <Image className="absolute -top-3 -right-3" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
                        </button>
                    </div>

                    <button onClick={showTimelineClick} className="xl:hidden relative mt-2 font-sans font-bold text-2xl bg-[#17192A] text-white px-4 h-16 rounded-2xl duration-200 hover:opacity-90 cursor-grab opacity-50">SHOW TIMELINE
                        <Image className="absolute -top-3 -right-3" src="lamp.svg" alt="Lamp" width={30} height={0}></Image>
                    </button>
                </div>
            </div>

            {/* Timeline */}
            <Timeline ref={timelineRef}/>
        </main>
    )
}   

export default MainSection