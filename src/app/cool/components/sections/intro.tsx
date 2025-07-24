'use client'
import { useRef } from "react"
import Main3d from "../Main3d"

const Intro = () => {
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    return(
    <div className="h-[calc(100vh*3)] min-h-[calc(100vh*3)] w-full absolute bg-[#000000] justify-center flex ">
        <div ref={modelContainerRef} className="sticky top-0 w-full h-[100vh] flex items-center justify-center">
            <Main3d />
        </div>
    </div>)
}

export default Intro