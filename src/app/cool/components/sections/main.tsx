'use client'
import { useEffect, useRef } from "react"
import Main3d from "../Main3d"

const Main = ()=>{
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    return(
    <div className="h-400 w-full relative bg-[#000000] justify-center flex">
        <div ref={modelContainerRef} className="fixed w-full min-h-200 h-200 max-h-200">
            <Main3d />
        </div>
    </div>)
}

export default Main