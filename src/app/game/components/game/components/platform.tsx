import { PlatformType, useGame } from "@/app/game/hooks/gameContext";
import { useFrame } from "@react-three/fiber"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
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
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F9C80E', '#9C27B0'];
export interface platformInterface {
    restart: () => void
}
const Platform = forwardRef<platformInterface>((props, ref) => {
    const {platformsRef, gameStatus, totalPlatforms, addPlatform} = useGame()
    const [platforms, setPlatforms] = useState<PlatformType[]>([]);
    const accumulatedGap = useRef<number>(0);
    const PLATFORM_SIZE = 12;
    const lastIndexRef = useRef<number>(0);

    function restart(){
        accumulatedGap.current = 0
        lastIndexRef.current = 0
        const initial:PlatformType[] = [];
        for (let i = 0; i < 3; i++) {
            initial.push({
                y: -1,
                x: i * PLATFORM_SIZE,
                height: 2,
                additionalGap: 0,
                color: colors[i % colors.length],
                backGap: 0
            });
        }
        platformsRef.current = initial;
        setPlatforms(initial);
        lastIndexRef.current = 2;
    }
    useEffect(() => {
        restart()
    }, []);

    useFrame((state) => {
        if(gameStatus != "running")  return;
        const cameraX = state.camera.position.x;
        if (platformsRef.current.length < 3) return;
        const nextPlatform = platformsRef.current[1];
        const nextX = nextPlatform.x + nextPlatform.additionalGap + nextPlatform.backGap;
        if (cameraX > nextX + PLATFORM_SIZE / 2) {
            platformsRef.current.shift();
            lastIndexRef.current += 1;
            const backGap = Math.floor(Math.random() * 2 + 1);
            accumulatedGap.current += backGap;
            const newPlatform: PlatformType = {
                y: -1,
                x: lastIndexRef.current * PLATFORM_SIZE,
                height: 2,
                additionalGap: accumulatedGap.current,
                backGap,
                color: colors[lastIndexRef.current % colors.length]
            };
            platformsRef.current.push(newPlatform);
            setPlatforms([...platformsRef.current]);
            addPlatform()
        }
    });

    const elementsRef = useRef<string[]>([])
    useEffect(() => {
        for (let i = 0; i < 5; i++) {
            elementsRef.current.push("1");
        }
    },[])

    useImperativeHandle(ref, () => ({
        restart
    }))

    return (<>

            {platforms.map((el, i) => {
                console.log(`Render platform ${i} at: ${el.x + el.additionalGap + el.backGap}`);
                return <mesh key={i} position={[el.x + el.additionalGap + el.backGap,el.y,0]} rotation={[0,0,0]}>
                    <boxGeometry args={[12,el.height,2]} />
                    <meshStandardMaterial color={el.color}/>
                </mesh>
            })}
            {   
                elementsRef.current.map((item, index) => (
                    <mesh key={index} position={[index * 12,-1,0]} rotation={[0,0,0]}>
                        <boxGeometry args={[1,8,2]} />
                        <meshStandardMaterial color={"#000000"}/>
                    </mesh>
                ))
            }
        </>
    )
})

export default Platform