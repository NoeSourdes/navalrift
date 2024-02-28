"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const { playHover, play } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [sentance, setSentance] = useState("");

  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col gap-6">
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center gap-6 p-6 overflow-y-scroll">
        <div className="absolute sm:top-12 top-5 left-1/2 text-sm text-gray-300 -translate-x-1/2 h-15 px-3 py-2 rounded-full bg-blue-900 border-2 border-blue-800 z-20 shadow-xl">
          Faites votre choix
        </div>
        <div
          onClick={() => {
            setSentance("Jouer contre une IA");
            onOpen();
          }}
          onMouseEnter={() => playHover()}
          className="h-full w-full bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all z-10 min-h-[300px] hover:shadow-2xl"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
              Jouer contre <br /> <span className="text-primary">une IA</span>
            </h1>
            <p></p>
            <p className="text-gray-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-5">
              La Bataille navale, un jeu de stratégie où l&apos;IA devient votre
              adversaire redoutable. Placez vos navires avec ruse et défiez
              l&apos;intelligence artificielle pour une victoire maritime.
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            setSentance("Jouer contre un ami");
            onOpen();
          }}
          onMouseEnter={() => playHover()}
          className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all z-10 min-h-[300px] hover:shadow-2xl"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
              Jouer contre <br /> <span className="text-primary">un ami</span>
            </h1>
            <p></p>
            <p className="text-gray-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-5">
              La Bataille navale, jeu stratégique classique où l&apos;amitié
              s&apos;exprime dans le défi. Déployez vos navires, affrontez votre
              ami, et que la meilleure tactique l&apos;emporte dans cette
              bataille navale amicale.
            </p>
          </div>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3>Commencer une partie</h3>
              </ModalHeader>
              <ModalBody>
                <p>{sentance}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onMouseEnter={() => playHover()}
                  color="danger"
                  variant="ghost"
                  onPress={() => {
                    onClose();
                    play();
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onPress={() => {
                    onClose();
                    play();
                    if (sentance === "Jouer contre une IA")
                      router.push("/admin/bataille-ia");
                    else router.push("/admin/bataille-ami");
                  }}
                  color="primary"
                  onMouseEnter={() => playHover()}
                >
                  Commencer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
