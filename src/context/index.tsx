"use client";

import { createContext, useContext, useState } from "react";
import { io } from "socket.io-client";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [isSelectedSound, setIsSelectedSound] = useState<boolean>(true);
  let [isSelectedVibration, setIsSelectedVibration] = useState<boolean>(true);
  let [isSelectedAnimation, setIsSelectedAnimation] = useState<boolean>(true);
  let [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  let [isPlayingMusicBattle, setIsPlayingMusicBattle] =
    useState<boolean>(false);
  let [isSelectGroupe, setIsSelectGroupe] = useState<boolean>(false);
  let [nameGroupeSelected, setNameGroupeSelected] = useState<string>("");
  let [idGroupeSelected, setIdGroupeSelected] = useState<string>("");
  let [creatorGroupSelected, setCreatorGroupSelected] = useState<string>("");
  const [sizeShipClicked, setSizeShipClicked] = useState<number>(0);
  const [rotateShipClicked, setRotateShipClicked] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  let [lien, setLien] = useState<string>("");
  const url_server = "https://navalrift-server.onrender.com";
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
        lien,
        setLien,
        sizeShipClicked,
        setSizeShipClicked,
        rotateShipClicked,
        setRotateShipClicked,
        isPlayingMusicBattle,
        setIsPlayingMusicBattle,
        volume,
        setVolume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
