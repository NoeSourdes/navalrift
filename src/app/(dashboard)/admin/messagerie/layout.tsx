"use client";

import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SideBar } from "./components/SideBar";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [maxLg, setMaxLg] = useState(false);
  console.log(maxLg);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    media.addEventListener("change", (e) => {
      setMaxLg(e.matches);
    });
  }, []);

  return (
    <div className="relative h-full w-full bg-blue-800/75 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-xl z-20 rounded-xl"
        style={{
          backdropFilter: open ? "blur(5px)" : "none",
          display: open ? "block" : "none",
        }}
      ></div>

      <div
        className="absolute top-6 left-6 bottom-6 max-lg:top-0 max-lg:bottom-0 w-[270px] rounded-xl bg-blue-900 max-lg:-left-[270px] transition-all z-20"
        style={{
          left: maxLg ? (open ? "0" : "-270px") : "24px",
        }}
      >
        <SideBar />{" "}
        <div
          className="absolute top-8 -right-12 p-3 bg-primary rounded-r-xl z-20 cursor-pointer lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <div className={`${open ? "rotate-180" : ""} transition-all`}>
            <ChevronRight />
          </div>
        </div>
      </div>
      <div className="absolute top-6 right-6 left-[318px] max-lg:left-6 bottom-6 z-10 transition-all">
        {children}
      </div>
    </div>
  );
}
