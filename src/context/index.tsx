"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isSelectedSound, setIsSelectedSound] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isSelectedSound") || "false")
  );
  const [isSelectedVibration, setIsSelectedVibration] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isSelectedVibration") || "true")
  );
  const [isSelectedAnimation, setIsSelectedAnimation] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isSelectedAnimation") || "true")
  );
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isPlayingMusic") || "false")
  );
  const [isSelectGroupe, setIsSelectGroupe] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("isSelectGroupe") || "false")
  );
  const [nameGroupeSelected, setNameGroupeSelected] = useState<string>(
    () => localStorage.getItem("nameGroupeSelected") || ""
  );
  const [idGroupeSelected, setIdGroupeSelected] = useState<string>(
    () => localStorage.getItem("idGroupeSelected") || ""
  );
  const [creatorGroupSelected, setCreatorGroupSelected] = useState<string>(
    () => localStorage.getItem("creatorGroupSelected") || ""
  );
  const url_server = "https://navalrift-server.onrender.com";
  const [socket] = useState(() => io(url_server));

  useEffect(() => {
    localStorage.setItem("isSelectedSound", JSON.stringify(isSelectedSound));
    localStorage.setItem(
      "isSelectedVibration",
      JSON.stringify(isSelectedVibration)
    );
    localStorage.setItem(
      "isSelectedAnimation",
      JSON.stringify(isSelectedAnimation)
    );
    localStorage.setItem("isPlayingMusic", JSON.stringify(isPlayingMusic));
    localStorage.setItem("isSelectGroupe", JSON.stringify(isSelectGroupe));
    localStorage.setItem("nameGroupeSelected", nameGroupeSelected);
    localStorage.setItem("idGroupeSelected", idGroupeSelected);
    localStorage.setItem("creatorGroupSelected", creatorGroupSelected);
  }, [
    isSelectedSound,
    isSelectedVibration,
    isSelectedAnimation,
    isPlayingMusic,
    isSelectGroupe,
    nameGroupeSelected,
    idGroupeSelected,
    creatorGroupSelected,
  ]);

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
        sockets: socket,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
