
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { movingBoxInterface } from "../components/game/components/movingBox"
import { platformInterface } from "../components/game/components/platform"

type PositionType = {x: number, y: number, z: number}
export type GameStatusType = "running" | "paused" |"gameover"
export interface PlatformType{
    y: number,
    x: number,
    height: number,
    additionalGap: number,
    backGap: number,
    color: string
}
type GameContextType = {
    cameraPosition: PositionType,
    setNewCameraPosTo: (newPos: PositionType) => void,
    gameStatus: GameStatusType,
    platformsRef: React.RefObject<PlatformType[]>,
    unPauseGame: () => void,
    endGame: () => void,
    movingBoxRef: React.RefObject<movingBoxInterface | null>,
    platformRef: React.RefObject<platformInterface | null>,
    restartGame: () => void,
    pauseGame: () => void,
    totalPlatforms: number,
    addPlatform: () => void
}
const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children} : {children: React.ReactNode}) => {
    const [gameStatus, setGameStatus] = useState<GameStatusType>("paused")
    const [cameraPosition, setCameraPosition] = useState<PositionType>({x: 0, y: 0, z: 10})
    const platformsRef = useRef<PlatformType[]>([]);
    const [totalPlatforms, setTotalPlatforms] = useState<number>(0)

    const movingBoxRef = useRef<movingBoxInterface | null>(null)
    const platformRef = useRef<platformInterface | null>(null)
    
    function setNewCameraPosTo(newPos: PositionType){
        setCameraPosition(newPos)
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if(document.hidden){
                setGameStatus("paused");
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    function unPauseGame(){
        setGameStatus("running");
    }
    function pauseGame(){
        setGameStatus("paused")
    }
    function endGame(){
        setGameStatus("gameover")
    }
    function restartGame(){
        movingBoxRef.current?.restart()
        platformRef.current?.restart()
        setTotalPlatforms(0)
        setGameStatus("running");
    }

    function addPlatform(){
        setTotalPlatforms(tot => tot + 1)
    }

    return(
        <GameContext.Provider value={{
                cameraPosition: cameraPosition, 
                setNewCameraPosTo: setNewCameraPosTo, 
                gameStatus: gameStatus, 
                platformsRef: platformsRef, 
                unPauseGame: unPauseGame, 
                endGame: endGame,
                platformRef: platformRef,
                movingBoxRef: movingBoxRef,
                restartGame: restartGame,
                pauseGame: pauseGame,
                totalPlatforms: totalPlatforms,
                addPlatform: addPlatform
            }}>
            {children}
        </GameContext.Provider >
    )
}


export const useGame = () => {
    const context = useContext(GameContext)
    if(!context){
        throw "useGame must be called inside of a GameProvider!"
    }
    return context;
}