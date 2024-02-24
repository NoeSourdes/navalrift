"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { SideBarResponsive } from "./components/SidBarResponsive";
import { SideBar } from "./components/sideBar";

interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isOpenClicked, setIsOpenClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const { playMusic } = useButtonSounds();
  const [maxWidth, setMaxWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setMaxWidth(true);
      } else {
        setMaxWidth(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    playMusic();
  }, [playMusic]);
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-[#001328]">
        <div
          onMouseOver={() => isOpenClicked && setIsOpen(true)}
          onMouseLeave={() => isOpenClicked && setIsOpen(false)}
          className="fixed top-6 left-6 bottom-6 rounded-xl transition-all bg-blue-800/75 max-xl:hidden"
          style={{
            width: isOpen ? "270px" : "80px",
          }}
        >
          <SideBar session={session} isOpenSidebar={isOpen} />
        </div>
        <div
          onMouseOver={() => isOpenClicked && setIsOpen(true)}
          onMouseLeave={() => isOpenClicked && setIsOpen(false)}
          className="absolute w-72 top-3 left-3 bottom-3 rounded-xl transition-all bg-blue-800/75 backdrop-blur-xl z-40"
          style={{
            transform: isOpenSideBar ? "translateX(0)" : "translateX(-110%)",
          }}
        >
          <SideBarResponsive
            session={session}
            isOpenSidebar={isOpen}
            setIsOpenSidBarResponsive={setIsOpenSideBar}
          />
        </div>
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-xl z-30 transition-all"
          onClick={() => setIsOpenSideBar(false)}
          style={{
            display: isOpenSideBar ? "block" : "none",
          }}
        ></div>
        <div className="h-16 fixed inset-3 xl:hidden z-20">
          <NavBar setIsOpenSidBarResponsive={setIsOpenSideBar} />
        </div>
        <div
          className="w-[24px] cursor-pointer h-24 fixed top-1/2 -translate-y-1/2 flex flex-col justify-center items-center transition-all max-xl:hidden z-20"
          style={{
            left: isOpen ? "294px" : "104px",
          }}
        >
          <Popover placement="right" isOpen={hover}>
            <PopoverTrigger>
              <div
                className="flex h-[72px] w-6 items-center justify-center"
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {
                  setHover(!hover);
                  setIsOpen(!isOpen);
                  setIsOpenClicked(!isOpenClicked);
                }}
              >
                <div className="flex h-8 w-6 flex-col items-center">
                  <div
                    className="h-4 w-1 rounded-full transition-all"
                    style={{
                      background: hover ? "#ECEDEE" : "#1B1F35",
                      transform: hover
                        ? isOpen
                          ? "translateY(0.15rem) rotate(15deg) translateZ(0px)"
                          : "translateY(0.15rem) rotate(-15deg) translateZ(0px)"
                        : "translateY(0.15rem) rotate(0deg) translateZ(0px)",
                    }}
                  ></div>
                  <div
                    className="h-4 w-1 rounded-full transition-all"
                    style={{
                      background: hover ? "#ECEDEE" : "#1B1F35",
                      transform: hover
                        ? isOpen
                          ? "translateY(-0.15rem) rotate(-15deg) translateZ(0px)"
                          : "translateY(-0.15rem) rotate(15deg) translateZ(0px)"
                        : "translateY(-0.15rem) rotate(0deg) translateZ(0px)",
                    }}
                  ></div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-tiny">
                  {isOpen ? "Réduire le menu" : "Agrandir le menu"}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div
          className="fixed xl:top-0 top-[76px] xl:right-6 right-3 bottom-0 xl:py-6 py-3 rounded-xl overflow-y-auto transition-all z-20"
          style={{
            left: isOpen
              ? maxWidth
                ? "12px"
                : "318px"
              : maxWidth
              ? "12px"
              : "128px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
