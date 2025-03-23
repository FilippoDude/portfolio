
'use client';
import { useEffect, useState } from "react";

const DisappearingText = ({children}: {children: React.ReactNode}) => {
        const [scrollY, setScrollY] = useState(0);
    
        const handleScroll = () => {
          setScrollY(window.scrollY);
          console.log(window.scrollY)
        };
      
        useEffect(() => {
          window.addEventListener("scroll", handleScroll);
          return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);

    
    return scrollY > 0 ? <></> : <>{children}</>
}

export default DisappearingText