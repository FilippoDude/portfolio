
"use client"
import { JSX, Ref, useEffect, useRef, useState } from "react";

const items: String[] = [
    "test1","test2","test3", "test4"
];

const ScrollingCarousel = () => {
    const containerElement = useRef<HTMLDivElement>(null);
    const hoveringContainer = useRef<boolean>(false);
    const startTime = useRef<number>(0);

    const [expandedCardKey, setExpandedCardKey] = useState<number | null>(null)
    const [expandedCardWidth, setExpandedCardWidth] = useState<string>("");
    const expandedCardElement = useRef<HTMLDivElement>(null);
    const hoveringCard = useRef<boolean>(false)
    const exiting = useRef<boolean>(false)

    useEffect(() => {
        startTime.current = performance.now();
        let animationFrameId: number;

        function animate(time: number) {
            if (containerElement.current) {
                const container = containerElement.current;
                const fullScrollWidth = container.scrollWidth / 2;

                const delta = time - startTime.current;

                if (!hoveringCard.current) {
                    container.scrollLeft = (delta / 6);

                    if (container.scrollLeft >= fullScrollWidth) {
                        startTime.current = time;
                        container.scrollLeft = 0;
                    }
                } else {
                    startTime.current = time - (container.scrollLeft * 6);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        }

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);




    const handleContainerMouseEnter = () => {
        hoveringContainer.current = true
    }

    const handleMouseEnter = (element: HTMLDivElement, idx: number) => {
        console.log(hoveringCard.current)
        console.log(containerElement.current)
        console.log(exiting.current)
        if (containerElement.current && hoveringCard.current == false && exiting.current == false) {
            hoveringCard.current = true;
            expandedCardElement.current = element;
    
            const container = containerElement.current;
            const containerWidth = container.offsetWidth;
            const calculatedWidth = containerWidth * 0.8;
            setExpandedCardWidth(`${calculatedWidth}px`);
            
            if(idx > items.length){ // Correct index for different cases
                setExpandedCardKey(idx - items.length);
            } else if(idx == 0){
                setExpandedCardKey(items.length);
            } else {
                setExpandedCardKey(idx);
            }
            
            if (idx > items.length) { // Correct position to make the scroll not noticeable
                let scrollTarget1 = element.offsetLeft - (container.clientWidth / 2) + (element.clientWidth / 2);
                scrollTarget1 -= container.scrollWidth / 2;
                container.scrollLeft = scrollTarget1;
            }
            
            // Get scrollLeft required to center the element on container
            let scrollTarget = element.offsetLeft - (container.clientWidth / 2) + (calculatedWidth / 2);
            if (idx > items.length) {  // Correct for different cases
                scrollTarget -= container.scrollWidth / 2;
            } else if(idx == 0) {
                scrollTarget += container.scrollWidth / 2;
            }
        
            container.scrollTo({
                left: scrollTarget,
                behavior: "smooth"
            });

        }
    };

    const handleContainerMouseLeave = () => {
        exiting.current = true; 
        setExpandedCardKey(null)
    };

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
    useEffect(() => {

        if (expandedCardKey == null && exiting.current === true) {
            timeoutRef.current = setTimeout(() => {
                if (containerElement.current && expandedCardElement.current) {
                    containerElement.current.scrollLeft = expandedCardElement.current.offsetLeft + (containerElement.current.clientWidth / 2) - (containerElement.current.offsetWidth * 0.8 / 2);
                }
                hoveringContainer.current = false; 
                hoveringCard.current = false;
                exiting.current = false;
            }, 600);
        }

        return () => {
            if(timeoutRef.current != null)
            clearTimeout(timeoutRef.current);
        };
    }, [expandedCardKey]);

    return (
        <div ref={containerElement} onMouseEnter={handleContainerMouseEnter} onMouseLeave={handleContainerMouseLeave} className="relative w-full flex flex-row gap-10 mt-2 flex-shrink-0 overflow-x-scroll no-scrollbar">
            {[...items, ...items].map((item, idx) => (
                <div key={idx} onMouseEnter={(e) => handleMouseEnter(e.currentTarget, idx)} className={"rounded-xl h-140 bg-[#2E3754] min-w-100 transition-all duration-300"} style={ idx === expandedCardKey ? {minWidth:  expandedCardWidth} : {}}>
                    <p className="text-white text-6xl" >{item}</p>
                </div>
            ))}
        </div>
    )
} 

export default ScrollingCarousel;