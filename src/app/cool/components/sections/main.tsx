'use client'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle, ScrollToPlugin);
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
            gsap.to(window, {duration: 2, scrollTo: titleRef.current})
        }
    }, [])

    return(
        <>
            <div ref={hiderRef} className="absolute top-0 w-full h-375 bg-[#0F101B] z-10"></div>
            <div ref={containerRef} className="h-screen bg-[#0F101B] w-full z-50 mt-375 flex items-center justify-center flex-col">
                <div className="relative flex items-center justify-center">
                    <h1 ref={titleRef} className="select-none absolute text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white blur-xs opacity-0">Filippo Grochala</h1>
                    <h1 ref={titleBlurRef} className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-[#FFFFFF20]">Filippo Grochala</h1>
                </div>
                <h1 className="mt-4 select-none text-center sm:text-left text-3xl sm:text-5xl font-raleway-sans font-bold text-white opacity-100"> <span className="text-green-200 text-center ">Website and model made by me<br/> (using threejs and Blender)</span></h1>
            </div>
        </>
    )
}

export default Main