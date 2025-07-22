'use client'
import { useRef } from "react"
import Main3d from "../Main3d"

const Intro = () => {
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    return(
    <div className="h-500 min-h-500 w-full absolute bg-[#000000] justify-center flex ">
        <div ref={modelContainerRef} className="sticky top-0 w-full min-h-200 h-200 max-h-200 flex items-center justify-center">
            <Main3d />
        </div>
    </div>)
}

export default Intro