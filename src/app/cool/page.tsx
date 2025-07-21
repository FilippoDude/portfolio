'use client'
import { useState } from "react";
import Main from "./components/sections/main"
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
    <div className="min-h-screen max-w-screen flex flex-col bg-[#0F101B]">
      <Main />
      {hasFinishedIntro ? (
        <div className="h-200 bg-[#0F101B] w-full relative"></div>
      ) : null}
    </div>
  );
};

export default CoolerPortoflio