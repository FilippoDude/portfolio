import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"

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

const Timeline = forwardRef((_, ref) => {
    
    // CONFIGURATION
    // Width in px where the timeline will change design from mobile focused to desktop
    const CHANGE_WIDTH = 1280
    
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const internalRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(isVisible){
            gsap.set(internalRef.current, {
                display: "flex"
            });
        } else {
            gsap.set(internalRef.current, {
                display: "none"
            })
        }
    }, [isVisible])

    const adaptToResize = ()=>{
        if (!internalRef.current) return;   
        if(window.innerWidth > CHANGE_WIDTH){
            document.body.style.overflow = ""
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    useLayoutEffect(() => {
        adaptToResize();
        window.addEventListener("resize", adaptToResize);
        return () => window.removeEventListener("resize", adaptToResize);
    }, []);

    const toggleVisibility = () => {
        if(window.innerWidth > CHANGE_WIDTH){return}
        setIsVisible(current => {
            const newCurrent = !current
            if(newCurrent){
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
            return newCurrent
        })
    }

    useImperativeHandle(ref, () => ({
        toggleVisibility,
    }));

    return(
        <div ref={internalRef} className="text-center hidden z-50 bg-[#000000] xl:bg-[#00000060] left-0 top-0 fixed xl:relative w-full xl:w-160 h-full xl:flex flex-col items-center overflow-y-scroll py-20 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="fixed -right-175 -bottom-175 w-200 h-200 bg-[#0F101B] blur-[300px]"/>
            <button onClick={toggleVisibility} className={`fixed bottom-2 right-2 w-20 h-20 bg-[#0F101B80] rounded-2xl z-30 flex xl:hidden items-center justify-center`}><div className="relative w-4/5 h-4/5 -mt-2"><Image src={"/home.svg"} alt="Home Logo" fill={true}></Image></div></button>
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

Timeline.displayName = "Timeline";

export default Timeline