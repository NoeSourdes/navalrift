"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";

export default function Page() {
  const { playHover, play } = useButtonSounds();
  return (
    <div className="h-full w-full flex flex-col gap-6">
      <div className="h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center justify-center gap-6 p-6">
        <div
          onMouseEnter={() => playHover()}
          className="h-full w-full bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
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
          onMouseEnter={() => playHover()}
          className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
              Jouer contre <br /> <span className="text-primary">un ami</span>
            </h1>
            <p></p>
            <p className="text-gray-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-5">
              La Bataille navale, jeu stratégique classique où &apos;amitié
              s&apos;exprime dans le défi. Déployez vos navires, affrontez votre
              ami, et que la meilleure tactique l&apos;emporte dans cette
              bataille navale amicale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
