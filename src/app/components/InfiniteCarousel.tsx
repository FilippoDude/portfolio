
"use client"
import {useEffect, useRef} from "react";

interface item {
    text: string
}
const items: item[] = [
    {text: "1"}, {text: "2"}, {text: "3"}, {text: "4"}, {text: "5"}
];

const ScrollingCarousel = () => {
    const itemLength = 400
    //const expandedItemLength = 1000

    const containerElement = useRef<HTMLDivElement>(null);
    const itemsRefs = useRef<HTMLDivElement[]>([])
    const interval = useRef<NodeJS.Timeout | null>(null)

    const loopRightList = (list: HTMLDivElement[]) => {
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
        if(containerElement.current){

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
        }

        interval.current = setInterval(() => {
            swipeItemsRight()
        }, 1000)

        return (() => {
            if(interval.current) clearInterval(interval.current)
        })
    }, [])


    const assignRef = (e: HTMLDivElement | null, i: number) => {
        if(e){
            itemsRefs.current[i] = e
        }
    }


    return (
        <div ref={containerElement} className="relative w-full flex flex-row gap-10 mt-2 h-140 flex-shrink-0 no-scrollbar justify-center">
            {items.map((x, i) => {
                return <div ref={(el) => assignRef(el, i)} key={i} className={"absolute top-0 left-0 rounded-xl h-140 bg-[#2E3754] transition-all duration-300"} style={{minWidth: itemLength}} >
                    <p className="text-white text-6xl" >{x.text}</p>
                </div>
            })
            }
        </div>
    )
} 

export default ScrollingCarousel;