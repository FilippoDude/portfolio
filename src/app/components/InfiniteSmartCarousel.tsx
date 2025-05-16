
"use client"
import { useEffect, useRef} from "react";
import Markdown from "react-markdown";
import Image from "next/image";

interface item {
    title: string,
    date: string,
    description: string,
    backgroundImage: string
}
const items: item[] = [
    {title: "CYBERCHALLENGE", date: "2024", description: "From Olicyber to Cyberchallenge!\nManaged to get **second place** in the local competition and got to the **national CTF competition as part of the team of Messina**", backgroundImage: "./"},
    {title: "TRINITY",date: "2024", description: "Got the B2.1 certification!", backgroundImage: "./"},
    {title: "ERASMUS",date: "2023/2024", description: "Went to spain for a week!", backgroundImage: "./"},
    {title: "OliCYBER",date: "2023/2024", description: "A logic and programming competition. Tried it but didn't go far...", backgroundImage: "./"},
    {title: "ROTARY",date: "2023", description: "Went to a presentation about Artificial intelligence made by Rotary.", backgroundImage: "./"}
];

const ScrollingCarousel = () => {
    const itemLength = 375
    const expandedItemLength = 1000

    const containerElement = useRef<HTMLDivElement>(null);
    const itemsRefs = useRef<HTMLDivElement[]>([])
    const isHovering = useRef<boolean>(false)

    const interval = useRef<NodeJS.Timeout | null>(null)

    const rightArrowRefs = useRef<HTMLButtonElement[]>([]);


    const loopRightList = (list: HTMLDivElement[] | HTMLButtonElement[]) => {
        list.forEach((e, i) => {
            list[list.length-i] = list[list.length-1-i]
        })
        list[1] = list[0]
        list[0] = list[list.length - 1]
        list.pop()
        return list;
    }

    const getVisibleElementsNumber = (containerElement: HTMLDivElement) => {
        if(itemLength * 3 > containerElement.offsetWidth){
            if(itemLength * 2 > containerElement.offsetWidth){
                return 1
            } else {
                return 2
            }
        } else {
            return 3
        }
    }
    /*
    900
    if 400 * 3 > 900:
        ( 1200 - 900 ) / 3
    else: 
        1270 - (400 * 3) = 150 / 3 

    */
    const swipeItemsRight = () => {
        if(containerElement.current && !isHovering.current){

            const visibleElementsNumber = getVisibleElementsNumber(containerElement.current)
            let jumpWidth: number;
            if(visibleElementsNumber == 3){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength * 3))/4+itemLength
            } else if (visibleElementsNumber == 2){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength * 2))/3+itemLength
            } else if (visibleElementsNumber == 1){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength))/2+itemLength
            }

            loopRightList(itemsRefs.current)
            loopRightList(rightArrowRefs.current)

            itemsRefs.current.forEach((e, i) => {
                const left = parseFloat(getComputedStyle(e).left);

                let newLeft;
                if(i == 0){
                    const oldStyleTransition = getComputedStyle(e).transitionDuration
                    e.style.transition = "none"
                    newLeft = -itemLength;
                    setTimeout(() => {
                        e.style.transition = oldStyleTransition;
                    }, 0);
                } else {
                    newLeft = left + jumpWidth;
                
                }

                e.style.left = `${newLeft}px`
                
            })
        }
    }

    useEffect(() => {
        if(containerElement.current){
            const oldStyleTransition = getComputedStyle(itemsRefs.current[0]).transitionDuration
            itemsRefs.current.forEach((e) => {
                e.style.transition = "none"
                setTimeout(() => {
                    swipeItemsRight()
                }, 0);
            })
            itemsRefs.current.forEach((e) => {
                e.style.transition = oldStyleTransition
            })
            const visibleElementsNumber = getVisibleElementsNumber(containerElement.current)
            
            let duration = 2000;
            if(visibleElementsNumber < 3){
                duration = 4000
            } 
            interval.current = setInterval(() => {
                swipeItemsRight()
            }, duration)

        }

        return (() => {
            if(interval.current) clearInterval(interval.current)
        })
    }, [])

    const startHover = (element: HTMLDivElement) => {
        const visibleElementsNumber = getVisibleElementsNumber(element)
        let centerElementIndex: number;

        if(visibleElementsNumber > 1){
            centerElementIndex = 2
        } else {
            centerElementIndex = 1
        }

        if(centerElementIndex > 1 && element.offsetWidth >= expandedItemLength){
            const centerElement: HTMLDivElement = itemsRefs.current[centerElementIndex]
            const jumpWidth: number = (element.offsetWidth - expandedItemLength)/2
            centerElement.style.width = `${expandedItemLength}px`
            centerElement.style.maxWidth = `${expandedItemLength}px`
            centerElement.style.left = `${jumpWidth}px`

            if(rightArrowRefs.current[centerElementIndex]){
                rightArrowRefs.current[centerElementIndex].style.opacity = "100"
            }
            let adjacentJumpWidth: number = (element.offsetWidth-(itemLength * 3))/4
            if(visibleElementsNumber == 3){
                adjacentJumpWidth = (element.offsetWidth-(itemLength * 3))/4
            } else if (visibleElementsNumber == 2){
                adjacentJumpWidth = (element.offsetWidth-(itemLength * 2))/3
            }
            itemsRefs.current[1].style.left = `${jumpWidth - (adjacentJumpWidth + itemLength)}px`
            itemsRefs.current[3].style.left = `${jumpWidth + (adjacentJumpWidth + expandedItemLength)}px`
            
            setTimeout(() => {
                if(interval.current){
                    clearInterval(interval.current)
                    interval.current = null
                }
                isHovering.current = true;
            }, 0);
        }
    }
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        startHover(e.currentTarget);
        
    };

    const stopHover = (element: HTMLDivElement) => {
        const visibleElementsNumber = getVisibleElementsNumber(element)
        let centerElementIndex: number;

        if(visibleElementsNumber > 1){
            centerElementIndex = 2
        } else {
            centerElementIndex = 1
        }


        if(centerElementIndex > 1){
            const centerElement: HTMLDivElement = itemsRefs.current[centerElementIndex]
            let jumpWidth: number = (element.offsetWidth-(itemLength * 3))/4+itemLength; // Default value
            if(visibleElementsNumber == 3){
                jumpWidth = (element.offsetWidth-(itemLength * 3))/4+itemLength
            } else if (visibleElementsNumber == 2){
                jumpWidth = (element.offsetWidth-(itemLength * 2))/3+itemLength
            }

            centerElement.style.width = `${itemLength}px`
            centerElement.style.maxWidth = `${itemLength}px`
            centerElement.style.left = `${jumpWidth * 2 - itemLength}px`
            
            if(rightArrowRefs.current[centerElementIndex]){
                rightArrowRefs.current[centerElementIndex].style.opacity = "0"
            }

            itemsRefs.current[1].style.left = `${jumpWidth - itemLength}px`
            itemsRefs.current[3].style.left = `${jumpWidth * 3 - itemLength}px`
        }

        setTimeout(() => {
            if(interval.current == null){
                let duration = 2000;
                if(visibleElementsNumber < 3){
                    duration = 3000
                } 
                interval.current = setInterval(() => {
                    swipeItemsRight()
                }, duration)
            }
            isHovering.current = false;
        }, 0);
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        stopHover(e.currentTarget)
    };

    
    const assignRef = (e: HTMLDivElement | null, i: number) => {
        if(e){
            itemsRefs.current[i] = e
        }
    }

    const assignArrowRef = (e: HTMLButtonElement | null, i: number) => {
        if(e){
            rightArrowRefs.current[i] = e
        }
    }

    const swipeRightButton = () => {
        if(containerElement.current){
            stopHover(containerElement.current)
            setTimeout(() => {
                swipeItemsRight()
            }, 0);
            setTimeout(() => {
                if(containerElement.current){
                    startHover(containerElement.current)
                }
            }, 0);
        }
    }

    return (
        <div ref={containerElement} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative w-full flex flex-row gap-10 mt-2 h-140 flex-shrink-0 no-scrollbar justify-center items-center">
            {items.map((x, i) => {
                return <div ref={(el) => assignRef(el, i)} key={i} className={"border-2 border-gray-500 absolute top-0 left-0 rounded-xl h-140 bg-[#2e37549a] transition-all duration-300"} style={{minWidth: itemLength, maxWidth: itemLength}} >
                    <div className="relative w-full h-full p-10 overflow-hidden">
                        <p className="text-white font-raleway-sans font-black text-6xl break-all h-fit" >{x.title}</p>
                        <p className="text-white font-sans font-black text-xl overflow-hidden h-fit opacity-80 italic" style={{whiteSpace: 'pre-line'}}>{x.date}</p>
                        <div className="text-white font-sans text-xl overflow-hidden h-fit opacity-60" style={{whiteSpace: 'pre-line'}}><Markdown >{x.description}</Markdown></div>
                    </div>
                    <button ref={(el) => assignArrowRef(el, i)} onClick={swipeRightButton} className={`z-10 cursor-pointer absolute top-1/2 -translate-y-1/2 transle right-10 h-20 w-20 transition-all duration-300 opacity-0`}>
                        <Image src="/carousel_arrow.png" alt="Navigation Arrow" fill={true}/>
                    </button>
                </div>
            })
            }
        </div>
    )
} 

export default ScrollingCarousel;