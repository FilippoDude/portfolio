
import { createContext, useContext, useEffect, useRef, useState } from "react"


type PositionType = {x: number, y: number, z: number}
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
    isPaused: boolean,
    platformsRef: React.RefObject<PlatformType[]>,
    unPauseGame: () => void
}
const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children} : {children: React.ReactNode}) => {
    const [isPaused, setIsPaused] = useState<boolean>(true)
    const [cameraPosition, setCameraPosition] = useState<PositionType>({x: 0, y: 0, z: 10})
    const platformsRef = useRef<PlatformType[]>([]);
    
    function setNewCameraPosTo(newPos: PositionType){
        setCameraPosition(newPos)
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if(document.hidden){
                setIsPaused(true);
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    function unPauseGame(){
        setIsPaused(false)
    }


    return(
        <GameContext.Provider value={{cameraPosition: cameraPosition, setNewCameraPosTo: setNewCameraPosTo, isPaused: isPaused, platformsRef: platformsRef, unPauseGame: unPauseGame}}>
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