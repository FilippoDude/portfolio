import { Canvas, useFrame } from "@react-three/fiber"
import {useEffect, useRef} from "react"
import gsap from "gsap"
import { GameProvider, useGame } from "../../hooks/gameContext"
import MovingBox, { movingBoxInterface } from "./components/movingBox"
import Platform from "./components/platform"

function GameCanvas () {
    const movingBoxRef = useRef<movingBoxInterface | null>(null)
    const unPauseButtonRef = useRef<HTMLButtonElement | null>(null)
    const {cameraPosition, isPaused, unPauseGame} = useGame()

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
    }, [isPaused])
    
    return(
        <>
            {isPaused ?
                <div className="absolute w-full h-full bg-[#89B0EDAA] z-10 backdrop-blur-sm flex items-center justify-center">
                    <button ref={unPauseButtonRef} onClick={unPauseGame} className="px-4 py-2 rounded-2xl font-bold text-2xl text-white bg-amber-600 cursor-pointer">Resume</button>
                </div>
            : null
            }
            <Canvas onClick={onClick} className="w-full h-full relative cursor-pointer" camera={{position: [cameraPosition.x, cameraPosition.y, cameraPosition.z]}}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <MovingBox ref={movingBoxRef}/>
                <Platform/>
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