"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="relative w-full h-full bg-blue-800/75 rounded-xl lg:p-6 p-3">
      <Button
        variant="faded"
        color="primary"
        className="absolute top-10 left-10 z-30"
        onClick={async () => {
          router.push("/dashboard");
        }}
      >
        Retour
      </Button>
      <div className="h-full w-full  bg-blue-900  bg-dot-[#0070EF] relative flex items-center justify-center rounded-lg overflow-hidden p-2 ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center gap-3 cursor-pointer">
          <h1 className="relative z-10 text-3xl md:text-6xl bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
            La page est en construction <br />{" "}
            <span className="text-primary">Revenez bientôt</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
