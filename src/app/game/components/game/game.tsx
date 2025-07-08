import { Canvas, useFrame } from "@react-three/fiber"
import {useRef} from "react"
import { GameProvider, useGame } from "../../hooks/gameContext"
import MovingBox, { movingBoxInterface } from "./components/movingBox"
import Platform from "./components/platform"

function GameCanvas () {
    const movingBoxRef = useRef<movingBoxInterface | null>(null)
    const {cameraPosition} = useGame()
    const onClick = () => {
        if(movingBoxRef.current != null){
            movingBoxRef.current.setToJump()
        }
    }
    return(
        <Canvas onClick={onClick} className="w-full h-full relative cursor-pointer" camera={{position: [cameraPosition.x, cameraPosition.y, cameraPosition.z]}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <MovingBox ref={movingBoxRef}/>
            <Platform/>
        </Canvas>
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