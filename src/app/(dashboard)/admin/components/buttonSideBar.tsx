"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { useAppContext } from "@/context";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
} from "@nextui-org/react";
import React, { FC, useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { MdAnimation, MdVibration } from "react-icons/md";

interface ButtonSideBarProps {
  logo: React.ComponentType;
  title: string;
  modal?: boolean;
}

const ButtonSideBar: FC<ButtonSideBarProps> = ({
  logo: Logo,
  title,
  modal = false,
}) => {
  const [hover, setHover] = useState(false);
  const { play, playHover, playSwitch } = useButtonSounds();

  const {
    isSelectedSound,
    setIsSelectedSound,
    isSelectedVibration,
    setIsSelectedVibration,
    isSelectedAnimation,
    setIsSelectedAnimation,
  } = useAppContext();

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const handleButtonClick = () => {
    play();
  };

  return (
    <div>
      {modal ? (
        <Dropdown placement="bottom-start" closeOnSelect={false}>
          <DropdownTrigger
            className="flex items-center gap-3"
            onClick={handleButtonClick}
          >
            <div
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={handleButtonClick}
              onMouseEnter={() => playHover()}
              className="w-full flex items-center justify-start cursor-pointer hover:bg-[#1A1F37] rounded-xl transition-all"
            >
              <div className="pl-3 py-2 flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    hover ? "text-base bg-primary" : "text-primary bg-[#1A1F37]"
                  }`}
                >
                  <Logo />
                </div>
                <div>
                  <h3 className="text-base">{title}</h3>
                </div>
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu variant="faded">
            {["Son", "Vibrations", "Animations"].map((item, index) => (
              <DropdownItem key={index}>
                <div
                  onMouseEnter={() => playHover()}
                  className="flex items-center justify-between h-7 overflow-y-auto relative"
                >
                  <div className="flex items-center gap-2">
                    {index === 0 && <AiFillSound className={iconClasses} />}
                    {index === 1 && <MdVibration className={iconClasses} />}
                    {index === 2 && <MdAnimation className={iconClasses} />}
                    <span>{item}</span>
                  </div>
                  <Switch
                    onClick={() => {
                      playSwitch();
                    }}
                    className="absolute -right-2"
                    size="sm"
                    isSelected={
                      index === 0
                        ? isSelectedSound
                        : index === 1
                        ? isSelectedVibration
                        : isSelectedAnimation
                    }
                    onValueChange={(value) => {
                      if (index === 0) {
                        setIsSelectedSound(value);
                      } else if (index === 1) {
                        setIsSelectedVibration(value);
                      } else {
                        setIsSelectedAnimation(value);
                      }
                    }}
                  ></Switch>
                </div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      ) : (
        <div
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleButtonClick}
          onMouseEnter={() => playHover()}
          className="w-full flex items-center justify-start cursor-pointer hover:bg-[#1A1F37] rounded-xl transition-all"
        >
          <div className="pl-3 py-2 flex items-center gap-3">
            <div
              className={`p-2 rounded-xl transition-colors ${
                hover ? "text-base bg-primary" : "text-primary bg-[#1A1F37]"
              }`}
            >
              <Logo />
            </div>
            <div>
              <h3 className="text-base">{title}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonSideBar;
