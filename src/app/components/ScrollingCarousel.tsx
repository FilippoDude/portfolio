
"use client"
import { JSX, Ref, useEffect, useRef, useState } from "react";

interface item {
    text: string
}
const items: item[] = [
    {text: "1"}, {text: "2"}, {text: "3"}, {text: "4"},
];

const ScrollingCarousel = () => {
    const containerElement = useRef<HTMLDivElement>(null);
    const centerElement = useRef<HTMLDivElement>(null);
    const [centerElementContent, setCenterElementContent] = useState<item | null>(null)
    const leftElement = useRef<HTMLDivElement>(null);
    const [leftElementContent, setLeftElementContent] = useState<item | null>(null)
    const rightElement = useRef<HTMLDivElement>(null);
    const [rightElementContent, setRightElementContent] = useState<item | null>(null)

    const [centerItemIndex, setCenterItemIndex] = useState<number | null>(null)

    const swipeItemsRight = () => {

    }

    useEffect(() => {
        setLeftElementContent(items[items.length - 1]);
        setCenterElementContent(items[0]);
        setRightElementContent(items[1]);
    }, [])

    return (
        <div ref={containerElement} className="relative w-full flex flex-row gap-10 mt-2 flex-shrink-0 overflow-x-scroll no-scrollbar justify-center">
            <div ref={leftElement} className={"rounded-xl h-140 bg-[#2E3754] min-w-100 transition-all duration-300"} >
                <p className="text-white text-6xl" >{leftElementContent?.text}</p>
            </div>
            <div ref={centerElement} className={"rounded-xl h-140 bg-[#2E3754] min-w-100 transition-all duration-300"} >
                <p className="text-white text-6xl" >{centerElementContent?.text}</p>
            </div>
            <div ref={rightElement} className={"rounded-xl h-140 bg-[#2E3754] min-w-100 transition-all duration-300"} >
                <p className="text-white text-6xl" >{rightElementContent?.text}</p>
            </div>
        </div>
    )
} 

export default ScrollingCarousel;