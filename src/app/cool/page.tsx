'use client'
import Intro from "./components/sections/intro"
import Main from "./components/sections/main";
import { CoolPageProvider, useCoolPage } from "./hooks/coolPageContext";

const CoolerPortoflio = () => {
  return (
    <CoolPageProvider>
      <CoolerPortoflioContent />
    </CoolPageProvider>
  );
};

const CoolerPortoflioContent = () => {
  const { hasFinishedIntro } = useCoolPage();
  
  return (
    <div className="min-h-400 max-w-screen flex flex-col bg-[#0F101B]">
      <Intro />
      {hasFinishedIntro ? (
        <Main/>
      ) : null}
    </div>
  );
};

export default CoolerPortoflio