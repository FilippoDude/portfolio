import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Mesh } from "three"
import { GameProvider, useGame } from "../hooks/gameContext"

function MovingBox({}){
    const boxRef = useRef<Mesh | null>(null)
    const jumpRef = useRef({
        isJumping: false,
        angle: 0,    
        startY: 0
    });

    function setToJump(){
        jumpRef.current.isJumping = true
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Space") {
            setToJump()
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
        window.removeEventListener("keydown", handleKeyDown)
    }
    }, [])

    useFrame((state, delta) => {
        if(boxRef.current != null){
            boxRef.current.position.x += delta * 0.5;
            state.camera.position.x = boxRef.current.position.x

            if(jumpRef.current.isJumping){
                const jumpHeight = 2;
                const speed = 2;
                const baseY = jumpRef.current.startY ?? (jumpRef.current.startY = boxRef.current.position.y);
                jumpRef.current.angle = (jumpRef.current.angle + delta * speed) % (2 * Math.PI);
                boxRef.current.position.y = baseY + Math.sin(jumpRef.current.angle) * jumpHeight;
                if(jumpRef.current.angle >= Math.PI){
                    boxRef.current.position.y = baseY;
                    jumpRef.current.isJumping = false
                    jumpRef.current.angle = 0
                }
            }
        }

    });

    return(            
        <mesh ref={boxRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="orange" />
        </mesh> 
    )
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