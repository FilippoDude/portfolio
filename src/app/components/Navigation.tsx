'use client'
import Image from "next/image";
import gsap from "gsap";
import { useRef } from "react";
const NavigationMenu = () => {
    return (
        <div className="w-70 h-full bg-[#42517340] backdrop-blur-2xl">

        </div>
    )
}

const NavigationButton = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const obscuratorRef = useRef<HTMLDivElement | null>(null)
    const onMouseEnter = () => {
        if(ref.current != null && obscuratorRef.current != null){
            document.body.style.overflow = "hidden"
            gsap.to(ref.current,{
                left: 0,
                duration: 0.3,
                ease: "power2.out"
            })
            gsap.to(obscuratorRef.current,{
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }

    const onMouseLeave = () => {
        if(ref.current != null && obscuratorRef.current != null){
            document.body.style.overflow = ""
            gsap.to(ref.current,{
                left: -280,
            })
            gsap.to(obscuratorRef.current,{
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }

    return (
        <div className="fixed w-full h-full z-60 left-0 top-0 pointer-events-none">
            <div ref={obscuratorRef} className="bg-[#000000] opacity-0 w-full h-full pointer-events-none"/>
            <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className=" absolute top-0 -left-70 flex flex-row h-full pointer-events-auto">
                <NavigationMenu></NavigationMenu>
                <button className={`mt-2 w-10 h-20 bg-[#42517340] rounded-r-2xl backdrop-blur-2xl`}>
                    <Image alt="Double right arrows" src={"/doubleArrowRight.svg"} fill={true}></Image>
                </button>
            </div>
        </div>
    )
}

export default NavigationButton;