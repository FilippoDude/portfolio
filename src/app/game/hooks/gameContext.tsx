import { createContext, useContext, useState } from "react"


type PositionType = {x: number, y: number, z: number}
type GameContextType = {
    cameraPosition: PositionType,
    setNewCameraPosTo: (newPos: PositionType) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const GameProvider = ({children} : {children: React.ReactNode}) => {
    const [cameraPosition, setCameraPosition] = useState<PositionType>({x: 0, y: 0, z: 10})
    
    function setNewCameraPosTo(newPos: PositionType){
        setCameraPosition(newPos)
    }

    return(
        <GameContext.Provider value={{cameraPosition: cameraPosition, setNewCameraPosTo: setNewCameraPosTo}}>
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