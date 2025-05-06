
"use client"
import { JSX, Ref, useEffect, useRef, useState } from "react";

const items: String[] = [
    "test1","test2","test3", "test4"
];

const ScrollingCarousel = () => {
    const ref = useRef<HTMLDivElement>(null);
    const hovering = useRef<boolean>(false);
    const startRef = useRef<number>(0);

    useEffect(() => {
        startRef.current = performance.now();
        function animate(time: number){
            const delta = time - startRef.current;
            if(ref.current){
                const halfScrollWidth = ref.current.scrollWidth / 2;
                if(!hovering.current){
                    ref.current.scrollLeft = (delta / 6) % halfScrollWidth;
                } else {
                    startRef.current = time - (ref.current.scrollLeft * 6)
                }
            }
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }, [])  

    const [expandedCardKey, setExpandedCardKey] = useState<number | null>(null)
    const hoveringCard = useRef<boolean>(false)
    const expandedCartElement = useRef<HTMLDivElement>(null);
    const [cardWidth, setCardWidth] = useState<string>("");

    const handleMouseEnter = (element: HTMLDivElement, idx: number) => {
        if (ref.current && !hoveringCard.current) {
            hoveringCard.current = true;
        
            const container = ref.current;
            const containerWidth = container.offsetWidth;
            const calculatedWidth = containerWidth * 0.8;
            setCardWidth(`${calculatedWidth}px`);
            
            if(idx > items.length){
                setExpandedCardKey(idx - items.length);
            } else {
                if(idx == 0){
                    setExpandedCardKey(items.length);
                    console.log(items.length)
                } else {
                    setExpandedCardKey(idx);
                }
            }
        
        
            // scroll to center the element
            let scrollTarget = element.offsetLeft - (container.clientWidth / 2) + (calculatedWidth / 2);
        
            // shift scroll back
            if (idx > items.length) {
                scrollTarget -= container.scrollWidth / 2;
            } else if(idx == 0) {
                scrollTarget += container.scrollWidth / 2;
            }
        
            console.log("ScrollTarget:", scrollTarget);
            container.scrollLeft = scrollTarget;

            expandedCartElement.current = element;
        }
    };

    const exiting = useRef<boolean>(false)
    const handleMouseLeave = () => {
        if(!exiting.current){
            exiting.current = true; 
            setTimeout(() => {
                exiting.current = false;
                if (ref.current && expandedCartElement.current) {
                    ref.current.scrollLeft = expandedCartElement.current.offsetLeft + (ref.current.clientWidth / 2) - (ref.current.offsetWidth * 0.8 / 2);
                }
                hovering.current = false; 
                hoveringCard.current = false;
                setExpandedCardKey(() => null)
            }, 400)
        }
    };
    return (
        <div ref={ref} onMouseEnter={() => {hovering.current = true}} onMouseLeave={handleMouseLeave} className="relative w-full flex flex-row gap-10 mt-2 flex-shrink-0 overflow-x-scroll no-scrollbar">
            {[...items, ...items].map((item, idx) => (
                <div key={idx} onMouseEnter={(e) => handleMouseEnter(e.currentTarget, idx)} className={"rounded-xl h-140 bg-[#2E3754] min-w-100 transition-all duration-300"} style={ idx === expandedCardKey ? {minWidth:  cardWidth} : {}}>
                    <p className="text-white text-6xl" >{item}</p>
                </div>
            ))}
        </div>
    )
} 

export default ScrollingCarousel;