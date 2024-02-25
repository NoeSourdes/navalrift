"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [isSelectedSound, setIsSelectedSound] = useState(false);
  let [isSelectedVibration, setIsSelectedVibration] = useState(true);
  let [isSelectedAnimation, setIsSelectedAnimation] = useState(true);
  let [isPlayingMusic, setIsPlayingMusic] = useState(false);
  return (
    <AppContext.Provider
      value={{
        isSelectedSound,
        setIsSelectedSound,
        isSelectedVibration,
        setIsSelectedVibration,
        isSelectedAnimation,
        setIsSelectedAnimation,
        isPlayingMusic,
        setIsPlayingMusic,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
