
"use client"
import { JSX, Ref, Reference, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

interface item {
    title: string,
    date: string,
    description: string,
    backgroundImage: string
}
const items: item[] = [
    {title: "CYBERCHALLENGE", date: "2024", description: "From Olicyber to Cyberchallenge!\nManaged to get second position in the local competition and got to the national competition in the team of Messina ", backgroundImage: "./"},
    {title: "2",date: "2024", description: "test", backgroundImage: "./"},
    {title: "3",date: "2024", description: "test", backgroundImage: "./"},
    {title: "4",date: "2024", description: "test", backgroundImage: "./"},
    {title: "5",date: "2024", description: "test", backgroundImage: "./"}
];

const ScrollingCarousel = () => {
    const itemLength = 375
    const expandedItemLength = 1000

    const containerElement = useRef<HTMLDivElement>(null);
    const itemsRefs = useRef<HTMLDivElement[]>([])
    const isHovering = useRef<Boolean>(false)

    const interval = useRef<NodeJS.Timeout | null>(null)

    const loopRightList = (list: any[]) => {
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

            let visibleElementsNumber = getVisibleElementsNumber(containerElement.current)
            var jumpWidth: number;
            if(visibleElementsNumber == 3){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength * 3))/4+itemLength
            } else if (visibleElementsNumber == 2){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength * 2))/3+itemLength
            } else if (visibleElementsNumber == 1){
                jumpWidth = (containerElement.current.offsetWidth-(itemLength))/2+itemLength
            }

            loopRightList(itemsRefs.current)

            itemsRefs.current.forEach((e, i) => {
                let left = parseFloat(getComputedStyle(e).left);

                var newLeft;
                if(i == 0){
                    let oldStyleTransition = getComputedStyle(e).transitionDuration
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
            let oldStyleTransition = getComputedStyle(itemsRefs.current[0]).transitionDuration
            itemsRefs.current.forEach((e, i) => {
                e.style.transition = "none"
                setTimeout(() => {
                    swipeItemsRight()
                }, 0);
            })
            itemsRefs.current.forEach((e, i) => {
                e.style.transition = oldStyleTransition
            })
        }

        interval.current = setInterval(() => {
            swipeItemsRight()
        }, 1000)

        return (() => {
            if(interval.current) clearInterval(interval.current)
        })
    }, [])

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        let visibleElementsNumber = getVisibleElementsNumber(element)
        var centerElementIndex: number;

        if(visibleElementsNumber > 1){
            centerElementIndex = 2
        } else {
            centerElementIndex = 1
        }

        if(centerElementIndex > 1 && element.offsetWidth >= expandedItemLength){
            let centerElement: HTMLDivElement = itemsRefs.current[centerElementIndex]
            let jumpWidth: number = (element.offsetWidth - expandedItemLength)/2
            centerElement.style.width = `${expandedItemLength}px`
            centerElement.style.maxWidth = `${expandedItemLength}px`
            centerElement.style.left = `${jumpWidth}px`

            var adjacentJumpWidth: number = (element.offsetWidth-(itemLength * 3))/4
            if(visibleElementsNumber == 3){
                adjacentJumpWidth = (element.offsetWidth-(itemLength * 3))/4
            } else if (visibleElementsNumber == 2){
                adjacentJumpWidth = (element.offsetWidth-(itemLength * 2))/3
            }
            itemsRefs.current[1].style.left = `${jumpWidth - (adjacentJumpWidth + itemLength)}px`
            itemsRefs.current[3].style.left = `${jumpWidth + (adjacentJumpWidth + expandedItemLength)}px`
        }
        
        setTimeout(() => {
            if(interval.current){
                clearInterval(interval.current)
                interval.current = null
            }
            isHovering.current = true;
        }, 0);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        let visibleElementsNumber = getVisibleElementsNumber(element)
        var centerElementIndex: number;

        if(visibleElementsNumber > 1){
            centerElementIndex = 2
        } else {
            centerElementIndex = 1
        }

        if(centerElementIndex > 1){
            let centerElement: HTMLDivElement = itemsRefs.current[centerElementIndex]
            var jumpWidth: number = (element.offsetWidth-(itemLength * 3))/4+itemLength; // Default value
            if(visibleElementsNumber == 3){
                jumpWidth = (element.offsetWidth-(itemLength * 3))/4+itemLength
            } else if (visibleElementsNumber == 2){
                jumpWidth = (element.offsetWidth-(itemLength * 2))/3+itemLength
            }

            centerElement.style.width = `${itemLength}px`
            centerElement.style.maxWidth = `${itemLength}px`
            centerElement.style.left = `${jumpWidth * 2 - itemLength}px`

            itemsRefs.current[1].style.left = `${jumpWidth - itemLength}px`
            itemsRefs.current[3].style.left = `${jumpWidth * 3 - itemLength}px`
        }

        setTimeout(() => {
            if(interval.current == null){
                interval.current = setInterval(() => {
                    swipeItemsRight()
                }, 1000)
            }
            isHovering.current = false;
        }, 0);

    };


    return (
        <div ref={containerElement} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative w-full flex flex-row gap-10 mt-2 h-140 flex-shrink-0 no-scrollbar justify-center">
            {items.map((x, i) => {
                return <div ref={(el) => {el ? (itemsRefs.current[i] = el) : null}} key={i} className={"border-2 border-gray-500 absolute top-0 left-0 rounded-xl h-140 bg-[#2e37549a] transition-all duration-300"} style={{minWidth: itemLength, maxWidth: itemLength}} >
                    <div className="relative w-full h-full p-10 overflow-hidden">
                        <p className="text-white font-raleway-sans font-black text-6xl break-all h-fit" >{x.title}</p>
                        <p className="text-white font-sans font-black text-xl overflow-hidden h-fit opacity-80 italic" style={{whiteSpace: 'pre-line'}}>{x.date}</p>
                        <div className="text-white font-sans text-xl overflow-hidden h-fit opacity-60" style={{whiteSpace: 'pre-line'}}><Markdown >{x.description}</Markdown></div>
                    </div>
                </div>
            })
            }
        </div>
    )
} 

export default ScrollingCarousel;