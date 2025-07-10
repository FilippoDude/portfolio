'use client'
import { useGame } from "@/app/game/hooks/gameContext";
import { getActualPlatformX } from "@/helpers/helpers";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Mesh } from "three";

export interface movingBoxInterface {
    setToJump: () => void,
    restart: () => void
}
const MovingBox = forwardRef<movingBoxInterface>((props, ref) => {
    const {gameStatus, platformsRef, endGame, totalPlatforms} = useGame()
    const boxRef = useRef<Mesh | null>(null)
    const jumpRef = useRef({
        isJumping: false,
        angle: 0,    
        startY: 0.5
    });
    const fallRef = useRef({
        isFalling: false
    })

    const setToJump = () => {
        if(!fallRef.current.isFalling){
            jumpRef.current.isJumping = true
        }
    }

    function restart(){
        if(!boxRef.current) return
        boxRef.current.position.x = 0
        boxRef.current.position.y = 0.5
        jumpRef.current.isJumping = false;
        fallRef.current.isFalling = false;
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
        if(gameStatus != "running") return;

        if(boxRef.current != null){ // Don't forget that delta exists
            if(!fallRef.current.isFalling) boxRef.current.position.x += delta * 4 + (totalPlatforms / 100);
            state.camera.position.x = boxRef.current.position.x
            if(jumpRef.current.isJumping){
                const jumpHeight = 2;
                const speed = 8;
                const baseY = jumpRef.current.startY ?? (jumpRef.current.startY = boxRef.current.position.y);
                jumpRef.current.angle = (jumpRef.current.angle + delta * speed) % (2 * Math.PI);
                boxRef.current.position.y = baseY + Math.sin(jumpRef.current.angle) * jumpHeight;
                if(jumpRef.current.angle >= Math.PI){
                    boxRef.current.position.y = baseY;
                    jumpRef.current.isJumping = false
                    jumpRef.current.angle = 0
                }
            }

            if(fallRef.current.isFalling){
                boxRef.current.position.y -= delta * 6;
                if(boxRef.current.position.y < - 5){
                    endGame()
                }
            }

            if(!fallRef.current.isFalling && platformsRef.current.length > 0){
                let closestObject = platformsRef.current[0]
                let closestObjectDistance = Math.abs(getActualPlatformX(platformsRef.current[0]) - boxRef.current.position.x)
                for(let i = 0; i < platformsRef.current.length; i++){
                    const distance = Math.abs(getActualPlatformX(platformsRef.current[i]) - boxRef.current.position.x)
                    if(distance < closestObjectDistance){
                        closestObject = platformsRef.current[i];
                        closestObjectDistance = distance
                    }
                }
                const distance = Math.abs(boxRef.current.position.x - getActualPlatformX(closestObject)) - 0.5
                if(distance > 12 / 2){
                    if(!jumpRef.current.isJumping){
                        fallRef.current.isFalling = true;
                    }
                }
            }
        }
    });

    useImperativeHandle(ref, ()=> ({
        setToJump,
        restart
    }))

    return(            
        <mesh ref={boxRef} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="orange" />
        </mesh> 
    )
})


export default MovingBox