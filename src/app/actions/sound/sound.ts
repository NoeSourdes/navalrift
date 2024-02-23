import { useAppContext } from "@/context";
import useSound from "use-sound";

export function useButtonSounds() {
  const { isSelectedSound } = useAppContext();
  const [play] = useSound("/sound/pop-down.mp3", { volume: 0.2 });
  const [playBottomButton] = useSound("/sound/pop-down.mp3", { volume: 0.3 });
  const [playHover] = useSound("/sound/pop-down.mp3", { volume: 0.2 });
  const [playSwitch] = useSound("/sound/switch-on.mp3", { volume: 0.5 });
  if (isSelectedSound) {
    return { play, playHover, playSwitch, playBottomButton };
  } else {
    return {
      play: () => {},
      playHover: () => {},
      playSwitch: () => {},
      playBottomButton: () => {},
    };
  }
}
