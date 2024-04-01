import { useAppContext } from "@/context";
import useSound from "use-sound";

export function useButtonSounds() {
  const { isSelectedSound, isPlayingMusic } = useAppContext();
  const [play, { stop }] = useSound("/sound/pop-down.mp3", { volume: 0.4 });
  const [playHover, { stop: stopHover }] = useSound("/sound/pop-down.mp3", {
    volume: 0.2,
  });
  const [playSwitch, { stop: stopSwitch }] = useSound("/sound/switch-on.mp3", {
    volume: 0.5,
  });
  const [playMusic, { stop: stopMusic }] = useSound("/sound/music2.mp3", {
    loop: true,
    volume: 0.07,
  });
  const [battleMusic, { stop: stopBattleMusic }] = useSound(
    "/sound/battle.mp3",
    {
      loop: true,
      volume: 0.1,
    }
  );

  let sounds = {
    play: () => {},
    playHover: () => {},
    playSwitch: () => {},
    playMusic: () => {},
    battleMusic: () => {},
  };

  if (isSelectedSound) {
    sounds.play = play;
    sounds.playHover = playHover;
    sounds.playSwitch = playSwitch;
    sounds.battleMusic = battleMusic;
  } else {
    stop();
    stopHover();
    stopSwitch();
    stopBattleMusic();
  }

  if (isPlayingMusic) {
    sounds.playMusic = playMusic;
  } else {
    stopMusic();
  }

  return sounds;
}
