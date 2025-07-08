import { useGame } from "@/app/game/hooks/gameContext";
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { Mesh } from "three"

interface platformType{
    positionX: number,
    color: string
}
function getRandomColor(colors: string[]): string {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F9C80E', '#9C27B0'];
const Platform = () => {
    const [platforms, setPlatforms] = useState<platformType[]>([])
    const PLATFORM_SIZE = 12;
    const visiblePlatformCount = 3;
    useFrame((state) => {
        const positionX = Math.floor(state.camera.position.x);
        const baseIndex = Math.floor(positionX / PLATFORM_SIZE);
        const newPlatforms = [];
        for(let i = baseIndex; i < baseIndex + visiblePlatformCount; i++) {
            newPlatforms.push({
                positionX: i * PLATFORM_SIZE,
                color: colors[i % colors.length] 
            });
        }
        setPlatforms(newPlatforms);
    });
    return (
        platforms.map((el, i) => {
            return <mesh key={i} position={[el.positionX,-1,0]} rotation={[0,0,0]}>
                <boxGeometry args={[12,2,2]} />
                <meshStandardMaterial color={el.color}/>
            </mesh>
        })
    )
}

export default Platform