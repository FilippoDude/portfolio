'use client'
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Mesh } from "three";

export interface movingBoxInterface {
    setToJump: () => void
}
const MovingBox = forwardRef<movingBoxInterface>((props, ref) => {
    const boxRef = useRef<Mesh | null>(null)
    const jumpRef = useRef({
        isJumping: false,
        angle: 0,    
        startY: 0.5
    });

    const setToJump = () => {
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
            boxRef.current.position.x += delta * 1;
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

    useImperativeHandle(ref, ()=> ({
        setToJump
    }))

    return(            
        <mesh ref={boxRef} position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="orange" />
        </mesh> 
    )
})


export default MovingBox