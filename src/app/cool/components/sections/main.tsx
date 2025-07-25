'use client'
import { useEffect, useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import Particles from "../Particles";

gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle, ScrollToPlugin, SplitText, ScrollTrigger);
const Main = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const hiderRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if(containerRef.current)
            gsap.fromTo(containerRef.current, {opacity: 0}, {opacity: 1, delay: 0.3, duration: 0.5})
        if(hiderRef.current)
            gsap.fromTo(hiderRef.current, {opacity: 0}, {opacity: 1, delay: 0.3, duration: 0.5})
    }, [])

    const titleBlurRef = useRef<HTMLHeadingElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    useEffect(() => {
        if(titleBlurRef.current != null && titleRef.current != null){
            gsap.from(titleRef.current, {
                duration:1,
                ease: CustomWiggle.create("myWiggle", {
                wiggles:10,
                type:"easeInOut"
                }),
                color: "#FFFFFF"
            })
            gsap.from(titleBlurRef.current, {
                duration:1,
                ease: CustomWiggle.create("myWiggle", {
                wiggles:10,
                type:"easeInOut"
                }),
                opacity: 1
            })
            gsap.to(window, {duration: 2, scrollTo: {y: titleRef.current}})
        }

    }, [])


    return(
        <div className="absolute top-0 flex flex-col w-full h-fit">
            <div className="h-[calc(100vh*3-100vh)] relative w-full"></div>
            <div ref={hiderRef} className="absolute mt-[calc(100vh*3-200vh)] top-0 w-full h-[100vh] bg-[#0F101B] z-10"></div>
            <div ref={containerRef} className="h-400 relative w-full">
                <div className="top-0 sticky h-screen bg-[#0F101B] w-full z-50 flex items-center justify-center flex-col">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Particles/>
                    </div>
                    <div className="relative flex items-center justify-center">
                        <h1 ref={titleBlurRef} className="select-none absolute text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white blur-xs opacity-0">Filippo Grochala</h1>
                        <h1 ref={titleRef} className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-[#FFFFFF20]">Filippo Grochala</h1>
                    </div>
                    <h1 className="mt-6 select-none text-center text-3xl font-raleway-sans font-bold text-white opacity-100">
                        <span className="text-green-200 block">
                            Website and model made by me using <br />
                            threejs and Blender
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Main