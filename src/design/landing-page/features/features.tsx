"use client";

import { Cobe } from "@/app/library/createGlobe";
import Spotlight, { SpotlightCard } from "@/app/library/spotlight";
import { Chip } from "@nextui-org/react";
import createGlobe from "cobe";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";

export const Features = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    let phi = 0;

    if (canvasRef.current !== null) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          // longitude latitude
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi;
          phi += 0.01;
        },
      });

      return () => {
        globe.destroy();
      };
    }
  }, []);

  const [play] = useSound("/sound/boom.mp3", { volume: 0.5 });

  const [vibrate, setVibrate] = useState(false);

  const handleClick = () => {
    setVibrate(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(200);
    }
    setTimeout(() => setVibrate(false), 1000);
  };
  const [rotate, setRotate] = useState(false);

  const handleClickAnimation = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
  };

  return (
    <div className="relative mt-20">
      <div className="absolute -rotate-12 w-full max-sm:max-w-[200px] max-w-[400px] h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-800 z-10 blur-[300px] max-sm:blur-[200px]"></div>
      <div className="relative z-20 flex flex-col items-center">
        <Chip color="primary" variant="dot" className="mb-3">
          Fonctionnalités
        </Chip>
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center max-w-6xl m-auto">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
                Explorez nos fonctionnalités
              </span>{" "}
              étonnantes
            </h2>
          </div>
          <div>
            <h5 className="text-center text-xl m-auto max-w-2xl text-gray-500">
              Plongez dans des parties en ligne avec vos amis ou défiez
              l&apos;ordinateur, profitez d&apos;une grille moderne, et
              intensifiez l&apos;expérience avec des sons, des vibrations et des
              animations captivantes pour une immersion totale.
            </h5>
          </div>
          <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
            <Spotlight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
              <SpotlightCard>
                <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                  <Cobe />
                  <h3 className="text-xl font-bold mb-4">Mode multijoueur</h3>
                  <p className="text-gray-500">
                    Jouez en ligne avec vos amis ou des joueurs du monde entier.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden flex flex-col justify-between">
                  <div className="relative w-full min-h-80">
                    <Image
                      src="/svg/computer.svg"
                      layout="fill"
                      alt="computer"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Mode solo</h3>
                    <p className="text-gray-500">
                      Jouez contre l&apos;ordinateur et améliorez vos
                      compétences.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden flex flex-col justify-between">
                  <div className="w-full min-h-80 p-3">
                    <div className="relative w-full h-full">
                      <Image
                        src="/svg/grille.svg"
                        layout="fill"
                        alt="grille"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Grille moderne</h3>
                    <p className="text-gray-500">
                      Profitez d&apos;une grille moderne et d&apos;une interface
                      utilisateur intuitive.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div
                  onClick={play}
                  className="relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer"
                >
                  <h3 className="text-xl font-bold mb-4">Effets sonores</h3>
                  <p className="text-gray-500">
                    Intensifiez l&apos;expérience avec des sons captivants.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div
                  className={`relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer ${
                    vibrate ? "vibrate" : ""
                  }`}
                  onClick={handleClick}
                >
                  <h3 className="text-xl font-bold mb-4">Vibrations</h3>
                  <p className="text-gray-500">
                    Ressentez chaque mouvement avec des vibrations réalistes.
                  </p>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div
                  className={`relative h-full bg-background p-6 pb-8 rounded-[inherit] z-20 overflow-hidden cursor-pointer ${
                    rotate ? "rotate" : ""
                  }`}
                  onClick={handleClickAnimation}
                >
                  <h3 className="text-xl font-bold mb-4">Animations</h3>
                  <p className="text-gray-500">
                    Intensifiez l&apos;expérience avec des animations
                    captivantes.
                  </p>
                </div>
              </SpotlightCard>
            </Spotlight>
          </div>
        </div>
      </div>
    </div>
  );
};
