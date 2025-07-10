import { Canvas } from "@react-three/fiber"
import {useEffect, useRef} from "react"
import gsap from "gsap"
import { GameProvider, useGame } from "../../hooks/gameContext"
import MovingBox, { movingBoxInterface } from "./components/movingBox"
import Platform, { platformInterface } from "./components/platform"

function GameCanvas () {
    const unPauseButtonRef = useRef<HTMLButtonElement | null>(null)
    const restartButtonRef = useRef<HTMLButtonElement | null>(null)
    const {movingBoxRef, platformRef, cameraPosition, gameStatus, unPauseGame, restartGame, pauseGame, totalPlatforms} = useGame()

    const onClick = () => {
        if(movingBoxRef.current != null){
            movingBoxRef.current.setToJump()
        }
    }
    useEffect(() => {
        gsap.fromTo(unPauseButtonRef.current, {
            scale: 1,
            ease: "power1.inOut"
        },{
            scale: 1.2,
            duration: 1,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true
        })
        gsap.fromTo(restartButtonRef.current, {
            scale: 1,
            ease: "power1.inOut"
        },{
            scale: 1.05,
            duration: 1,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true
        })
    }, [gameStatus])
    
    return(
        <>
            {gameStatus == "paused" ?
                <div className="absolute w-full h-full bg-[#89B0EDAA] z-10 backdrop-blur-sm flex items-center justify-center flex-col gap-2">
                    <button ref={unPauseButtonRef} onClick={unPauseGame} className="px-4 py-2 rounded-2xl font-bold text-2xl text-white bg-amber-600 cursor-pointer">Resume</button>
                    <button ref={restartButtonRef} onClick={restartGame} className="px-4 py-2 rounded-2xl font-bold text-2xl text-white bg-red-600 cursor-pointer">Restart</button>
                </div>
            : gameStatus == "gameover" ? 
                <div className="absolute w-full h-full bg-[#89B0EDAA] z-10 backdrop-blur-sm flex items-center justify-center">
                    <button ref={unPauseButtonRef} onClick={restartGame} className="px-4 py-2 rounded-2xl font-bold text-2xl text-white bg-red-600 cursor-pointer">Restart</button>
                </div>
            : gameStatus == "running" ? 
                <>
                    <p className="absolute left-1 top-1">Score: {totalPlatforms}</p>
                    <button onClick={pauseGame} className="absolute top-1 right-1 px-2 py-1 bg-[#e17100] rounded-sm z-10 cursor-pointer font-bold text-white">Pause</button>
                </>
            : null
            }
            
            <Canvas onClick={onClick} className="w-full h-full relative cursor-pointer" camera={{position: [cameraPosition.x, cameraPosition.y, cameraPosition.z]}}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <MovingBox ref={movingBoxRef}/>
                <Platform ref={platformRef}/>
            </Canvas>
        </>
    )
}
const Game = () => {
    return(
        <GameProvider>
            <GameCanvas/>
        </GameProvider>
    ) 
}

export default Game