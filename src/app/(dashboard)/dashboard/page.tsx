"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import { useRouter } from "next/navigation";

export default function Page() {
  const { playHover, play } = useButtonSounds();
  const router = useRouter();

  return (
    <div className="h-full w-full flex flex-col lg:gap-6 gap-3">
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center lg:gap-6 gap-3 lg:p-6 p-3 overflow-y-scroll">
        <div className="absolute sm:top-12 top-5 left-1/2 text-sm text-gray-300 -translate-x-1/2 h-15 px-3 py-2 rounded-full bg-blue-900 border-2 border-blue-800 z-20 shadow-xl">
          Faites votre choix
        </div>
        <div
          onClick={() => {
            router.push("/dashboard/bataille");
          }}
          onMouseEnter={() => playHover()}
          className="h-full w-full bg-blue-900  bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all z-10 min-h-[300px] hover:shadow-2xl"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
              Bataille <br /> <span className="text-primary">navale</span>
            </h1>
            <p className="text-gray-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-5">
              La bataille navale est un jeu de stratégie. Deux joueurs
              s&apos;affrontent pour couler les navires adverses. Utilisez votre
              intelligence pour localiser et détruire les navires ennemis tout
              en protégeant les vôtres. Préparez-vous à une bataille épique !
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            router.push("/dashboard/demineur");
          }}
          onMouseEnter={() => playHover()}
          className="h-full w-full  bg-blue-900  bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-all z-10 min-h-[300px] hover:shadow-2xl"
        >
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative h-[120px] flex items-center justify-center z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
              Démi<span className="text-primary">neur</span>
            </h1>
            <p className="text-gray-300 max-w-lg mx-auto my-2 text-sm text-center relative z-10 mt-5">
              Le démineur est un jeu de réflexion. Trouvez les mines cachées
              dans un champ de jeu en cliquant sur les cases. Utilisez les
              indices pour éviter les mines et déminez le terrain. Soyez
              prudent, une seule erreur peut être fatale !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
