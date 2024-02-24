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

  let sounds = {
    play: () => {},
    playHover: () => {},
    playSwitch: () => {},
    playMusic: () => {},
  };

  if (isSelectedSound) {
    sounds.play = play;
    sounds.playHover = playHover;
    sounds.playSwitch = playSwitch;
  } else {
    stop();
    stopHover();
    stopSwitch();
  }

  if (isPlayingMusic) {
    sounds.playMusic = playMusic;
  } else {
    stopMusic();
  }

  return sounds;
}
