
import { createContext, useContext, useEffect, useRef, useState } from "react"


type PositionType = {x: number, y: number, z: number}
type GameContextType = {
    cameraPosition: PositionType,
    setNewCameraPosTo: (newPos: PositionType) => void,
    isVisible: React.RefObject<boolean>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children} : {children: React.ReactNode}) => {
    const isVisible = useRef<boolean>(true)
    const [cameraPosition, setCameraPosition] = useState<PositionType>({x: 0, y: 0, z: 10})
    
    function setNewCameraPosTo(newPos: PositionType){
        setCameraPosition(newPos)
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            isVisible.current = !document.hidden;
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);


    return(
        <GameContext.Provider value={{cameraPosition: cameraPosition, setNewCameraPosTo: setNewCameraPosTo, isVisible: isVisible}}>
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