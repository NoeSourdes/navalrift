import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export function useButtonSounds() {
  const {
    isSelectedSound,
    isPlayingMusic,
    volume: contextVolume,
  } = useAppContext();
  const [volume, setVolume] = useState(contextVolume);

  useEffect(() => {
    const interval = setInterval(() => {
      if (volume < contextVolume) {
        setVolume(volume + 0.01);
      } else if (volume > contextVolume) {
        setVolume(volume - 0.01);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [contextVolume, volume]);
  let [play, { stop, sound }] = useSound("/sound/pop-down.mp3", {
    volume: 0.4,
  });
  let [playHover, { stop: stopHover, sound: soundHover }] = useSound(
    "/sound/pop-down.mp3",
    { volume: 0.2 }
  );
  let [playSwitch, { stop: stopSwitch, sound: soundSwitch }] = useSound(
    "/sound/switch-on.mp3",
    { volume: 0.5 }
  );
  let [playMusic, { stop: stopMusic, sound: soundMusic }] = useSound(
    "/sound/music2.mp3",
    { loop: true, volume: volume }
  );
  let [battleMusic, { stop: stopBattleMusic, sound: soundBattleMusic }] =
    useSound("/sound/battle.mp3", { loop: true, volume: 0.1 });

  let [explosion, { stop: stopExplosion, sound: soundExplosion }] = useSound(
    "/sound/explosion.mp3",
    { volume: 0.5 }
  );

  let [goutte_1, { stop: stopGoutte_1, sound: soundGoutte_1 }] = useSound(
    "/sound/goutte_1.mp3",
    { volume: 0.5 }
  );
  let [goutte_2, { stop: stopGoutte_2, sound: soundGoutte_2 }] = useSound(
    "/sound/goutte_2.mp3",
    { volume: 0.5 }
  );

  let [start, { stop: stopStart, sound: soundStart }] = useSound(
    "/sound/start.mp3",
    { volume: 0.5 }
  );

  let sounds = {
    play: () => {},
    playHover: () => {},
    playSwitch: () => {},
    playMusic: () => {},
    battleMusic: () => {},
    explosion: () => {},
    goutte_1: () => {},
    goutte_2: () => {},
    start: () => {},
  };

  if (isSelectedSound) {
    sounds.play = play;
    sounds.playHover = playHover;
    sounds.playSwitch = playSwitch;
    sounds.battleMusic = battleMusic;
    sounds.explosion = explosion;
    sounds.goutte_1 = goutte_1;
    sounds.goutte_2 = goutte_2;
    sounds.start = start;
  } else {
    stop();
    stopHover();
    stopSwitch();
    stopBattleMusic();
    stopExplosion();
    stopGoutte_1();
    stopGoutte_2();
    stopStart();
  }

  if (isPlayingMusic) {
    sounds.playMusic = playMusic;
  } else {
    stopMusic();
  }

  return sounds;
}
