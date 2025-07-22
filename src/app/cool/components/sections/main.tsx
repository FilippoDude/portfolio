'use client'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";
import { CustomEase } from "gsap/CustomEase";
import { CustomBounce } from "gsap/CustomBounce";
import { CustomWiggle } from "gsap/CustomWiggle";

gsap.registerPlugin(RoughEase,ExpoScaleEase,SlowMo,CustomEase,CustomBounce,CustomWiggle);
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
    }, [])

    return(
        <>
            <div ref={hiderRef} className="absolute top-0 w-full h-375 bg-[#0F101B] z-60"></div>
            <div ref={containerRef} className="h-125 bg-[#0F101B] w-full z-50 mt-375">
                <div className="absolute flex items-center justify-center w-full">
                    <h1 ref={titleRef} className="select-none absolute text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-white blur-xs opacity-0">Made by Filippo<br/> using Threejs</h1>
                    <h1 ref={titleBlurRef} className="text-center sm:text-left text-7xl sm:text-8xl font-raleway-sans font-bold text-[#FFFFFF20]">Made by Filippo<br/> using Threejs</h1>
                </div>
            </div>
        </>
    )
}

export default Main