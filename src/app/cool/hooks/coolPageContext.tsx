'use client'
import { createContext, useContext, useState } from "react";


interface CoolPageContextType {
    hasFinishedIntro: boolean,
    toggleHasFinishedIntro: () => void
}
const CoolPageContext = createContext<CoolPageContextType | undefined>(undefined)

export const CoolPageProvider = ({children} : {children: React.ReactNode}) => {
    const [hasFinishedIntro, setHasFinishedIntro] = useState<boolean>(true)

    const toggleHasFinishedIntro = () => {
        setHasFinishedIntro(prev => !prev)
    }

    return(
        <CoolPageContext.Provider value={{hasFinishedIntro: hasFinishedIntro, toggleHasFinishedIntro: toggleHasFinishedIntro}}>
            {children}
        </CoolPageContext.Provider>
    )
}

export function useCoolPage(){
    const context = useContext(CoolPageContext)
    if(!context){
        throw("CoolPageContext should only be used in context!")
    }
    return context
}