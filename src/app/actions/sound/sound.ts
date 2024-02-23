import { useAppContext } from "@/context";
import useSound from "use-sound";

export function useButtonSounds() {
  const { isSelectedSound } = useAppContext();
  const [play, { stop }] = useSound("/sound/pop-down.mp3", { volume: 0.4 });
  const [playHover, { stop: stopHover }] = useSound("/sound/pop-down.mp3", {
    volume: 0.2,
  });
  const [playSwitch, { stop: stopSwitch }] = useSound("/sound/switch-on.mp3", {
    volume: 0.5,
  });
  const [playMusic, { stop: stopMusic }] = useSound("/sound/music.mp3", {
    loop: true,
    volume: 0.1,
  });
  if (isSelectedSound) {
    return { play, playHover, playSwitch, playMusic };
  } else {
    stop();
    stopHover();
    stopSwitch();
    stopMusic();
    return {
      play: () => {},
      playHover: () => {},
      playSwitch: () => {},
      playMusic: () => {},
    };
  }
}
