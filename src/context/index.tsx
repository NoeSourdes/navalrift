"use client";

import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [isSelectedSound, setIsSelectedSound] = useState<boolean>(false);
  let [isSelectedVibration, setIsSelectedVibration] = useState<boolean>(true);
  let [isSelectedAnimation, setIsSelectedAnimation] = useState<boolean>(true);
  let [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  let [isSelectGroupe, setIsSelectGroupe] = useState<boolean>(false);
  let [nameGroupeSelected, setNameGroupeSelected] = useState<string>("");
  let [idGroupeSelected, setIdGroupeSelected] = useState<string>("");
  let [creatorGroupSelected, setCreatorGroupSelected] = useState<string>("");
  const url_server = "http://localhost:3001";
  // "https://navalrift-server.onrender.com";
  let sockets: any;
  sockets = io(url_server);
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
        isSelectGroupe,
        setIsSelectGroupe,
        nameGroupeSelected,
        setNameGroupeSelected,
        idGroupeSelected,
        setIdGroupeSelected,
        creatorGroupSelected,
        setCreatorGroupSelected,
        sockets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
