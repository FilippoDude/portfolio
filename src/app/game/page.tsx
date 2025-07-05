'use client'

import Game from "./components/game"

const GamePage = () => {

    return (
        <div className="min-h-screen max-w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0F101B]">
            <div className="w-200 h-100 bg-white">
                <Game/>
            </div>
        </div>
    )
}

export default GamePage