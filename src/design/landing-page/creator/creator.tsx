"use client";

import Overlay, { OverlayCard } from "@/app/library/overlayCard";
import { Chip } from "@nextui-org/react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Ambilight } from "../components/ambilight";

export const Creator = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Chip color="primary" variant="dot" className="mb-3">
        Créateur
      </Chip>

      <div className="flex max-lg:flex-col justify-center items-center space-y-10 lg:gap-16 gap-5">
        <div className="max-w-lg space-y-3 ">
          <h2 className="text-xl font-bold text-primary">
            CRÉÉ DE A À Z PAR...
          </h2>
          <h1 className="text-4xl font-bold">Noé Sourdès</h1>
          <p className="text-gray-400">
            Développeur web passionné qui façonne des solutions exceptionnelles
            avec dévouement et créativité. Avec un parcours numérique représente
            une aventure continue axée sur l&apos;innovation.
          </p>
        </div>
        <div>
          <Overlay className="max-w-sm">
            <OverlayCard>
              <div className="relative h-full bg-[#27272A] p-6 pb-8 rounded-[inherit] z-20 overflow-hidden space-y-5">
                <Ambilight />
                <div className="w-full flex items-center justify-between">
                  <div>
                    <h5 className="text-[#F3F4F6] text-xl">Noé Sourdès</h5>
                    <span className="text-gray-400 text-xl">
                      Développeur Web
                    </span>
                  </div>
                  <Link
                    href="https://github.com/NoeSourdes"
                    className="w-16 h-16 bg-[#18181B] rounded-xl flex items-center justify-center text-3xl shadow-lg"
                  >
                    <FaGithub />
                  </Link>
                </div>
              </div>
            </OverlayCard>
          </Overlay>
        </div>
      </div>
    </div>
  );
};
