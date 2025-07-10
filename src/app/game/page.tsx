'use client'

import Game from "./components/game/game"

const GamePage = () => {

    return (
        <div className="min-h-screen max-w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0F101B]">
            <div className="relative w-200 h-100 bg-white">
                <Game/>
            </div>
            <div className="mt-2 flex flex-col gap-2 items-center">
                <p className="text-white">Press space or click to jump</p>
                <p className="text-white">Small 2d platformer made using only ThreeJs Fiber, <a className="text-purple-800" href="https://github.com/FilippoDude/portfolio">see code here</a></p>
                <p className="text-white">Code written 99% by me {"<"}3</p>
            </div>
        </div>
    )
}

export default GamePage