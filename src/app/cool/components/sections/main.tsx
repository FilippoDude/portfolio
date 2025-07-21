'use client'
import { useEffect, useRef } from "react"
import Main3d from "../Main3d"

const Main = () => {
    const modelContainerRef = useRef<HTMLDivElement | null>(null)
    return(
    <div className="h-600 min-h-600 w-full relative bg-[#000000] justify-center flex">
        <div ref={modelContainerRef} className="sticky top-0 w-full min-h-200 h-200 max-h-200">
            <Main3d />
        </div>
    </div>)
}

export default Main