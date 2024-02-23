"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SideBar } from "./components/sideBar";

interface LayoutAdminProps {
  children: React.ReactNode;
}

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenClicked, setIsOpenClicked] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gradient-to-t to-black from-blue-800">
        <div
          onMouseOver={() => isOpenClicked && setIsOpen(true)}
          onMouseLeave={() => isOpenClicked && setIsOpen(false)}
          className="fixed top-6 left-6 bottom-6 rounded-xl transition-all"
          style={{
            width: isOpen ? "270px" : "80px",
          }}
        >
          <SideBar session={session} isOpenSidebar={isOpen} />
        </div>
        <div
          className="w-[24px] cursor-pointer h-24 fixed top-1/2 -translate-y-1/2 flex flex-col justify-center items-center transition-all"
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
          className="fixed top-0 right-6 bottom-0 py-6 rounded-xl overflow-y-auto transition-all"
          style={{
            left: isOpen ? "318px" : "128px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
