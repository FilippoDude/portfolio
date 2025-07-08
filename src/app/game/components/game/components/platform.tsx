import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
/*older code
    const [platforms, setPlatforms] = useState<platformType[]>([])
    const accumulatedGap = useRef<number>(0)
    const PLATFORM_SIZE = 12;
    const visiblePlatforms = 3
    const gap = 2
    useFrame((state) => {
        const positionX = Math.floor(state.camera.position.x);
        const baseIndex = Math.floor(positionX / PLATFORM_SIZE);
        const newPlatforms = [];
        let tmp = 0
        let tmpAccumulatedGap = accumulatedGap.current
        for(let i = baseIndex; i < baseIndex + visiblePlatforms; i++) {
            const newPlatform = {
                positionX: (i * PLATFORM_SIZE),
                additionalGap: tmpAccumulatedGap,
                color: colors[i % colors.length] 
            }
            newPlatforms.push(newPlatform);
            tmp++;
        }
        if((platforms.length > 0 && platforms[0].positionX != newPlatforms[0].positionX) || platforms.length == 0){
            if ( platforms.length > 0){console.log(platforms[0].positionX)
            console.log(newPlatforms[0].positionX)}
            accumulatedGap.current = tmpAccumulatedGap
            setPlatforms(newPlatforms);
        }
    });

*/
interface platformType{
    positionX: number,
    additionalGap: number,
    color: string
}
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F9C80E', '#9C27B0'];
const Platform = () => {
    const [platforms, setPlatforms] = useState<platformType[]>([]);
    const accumulatedGap = useRef<number>(0);
    const gapMap = useRef<Map<number, number>>(new Map()); 
    const PLATFORM_SIZE = 12;
    const visiblePlatforms = 3;
    const MAX_GAP = 3;

    useFrame((state) => {
        const positionX = Math.floor(state.camera.position.x);
        const baseIndex = Math.floor(positionX / PLATFORM_SIZE);

        const newPlatforms = [];
        let tmpAccumulatedGap = 0;

        for (let i = baseIndex; i < baseIndex + visiblePlatforms; i++) {

            if (!gapMap.current.has(i)) {
                const randomGap = Math.floor(Math.random() * (MAX_GAP + 1)); 
                gapMap.current.set(i, randomGap);
            }

            const currentGap = gapMap.current.get(i)!;
            const newPlatform = {
                positionX: i * PLATFORM_SIZE,
                additionalGap: tmpAccumulatedGap,
                color: colors[i % colors.length]
            };

            newPlatforms.push(newPlatform);
            tmpAccumulatedGap += currentGap;
        }

        if (
            platforms.length === 0 ||
            platforms[0].positionX !== newPlatforms[0].positionX
        ) {
            accumulatedGap.current = tmpAccumulatedGap;
            setPlatforms(newPlatforms);
        }
    });

    return (
        platforms.map((el, i) => {
            return <mesh key={i} position={[el.positionX + el.additionalGap,-1,0]} rotation={[0,0,0]}>
                <boxGeometry args={[12,2,2]} />
                <meshStandardMaterial color={el.color}/>
            </mesh>
        })
    )
}

export default Platform