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
    const platformRefs = useRef<platformType[]>([])
    const [platforms, setPlatforms] = useState<platformType[]>([])
    useFrame((state, delta) => {
        const positionX = Math.floor(state.camera.position.x)
        if(platformRefs.current.some((el) => el.positionX == positionX + 12)) return
        if(platformRefs.current.length == 0){
            platformRefs.current.push({positionX: positionX, color: getRandomColor(colors)})
            setPlatforms([... platformRefs.current])
        }
        if(positionX%12 == 0){
            platformRefs.current.push({positionX: positionX + 12, color: getRandomColor(colors)})
            setPlatforms([... platformRefs.current])
        }

        if(platformRefs.current[0].positionX < positionX - 12){
            platformRefs.current.shift()
            setPlatforms([... platformRefs.current])
        }
    })
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