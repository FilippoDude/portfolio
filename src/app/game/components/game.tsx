import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Mesh } from "three"
import { GameProvider, useGame } from "../hooks/gameContext"

function MovingBox({}){
    const boxRef = useRef<Mesh | null>(null)

    useEffect(() => {
        return () => {
        }
    },[])

    useFrame((state, delta) => {
        if(boxRef.current != null){
            boxRef.current.position.x += delta * 0.5;
            state.camera.position.x = boxRef.current.position.x
        }
    });

    return(            
        <mesh ref={boxRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="orange" />
        </mesh> )
}
function GameCanvas () {
    const {cameraPosition} = useGame()
    return(
        <Canvas className="w-full h-full relative" camera={{position: [cameraPosition.x, cameraPosition.y, cameraPosition.z]}}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <MovingBox/>
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