"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { Copy } from "lucide-react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BatailleAmi() {
  const [hover, setHover] = useState(false);
  const [lien, setLien] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setLien(window.location.href);
    }, 100);
  }, []);
  return (
    <div className="relative w-full h-full bg-blue-800/75 rounded-xl p-6">
      <Button
        variant="faded"
        color="primary"
        className="absolute top-10 left-10 z-30"
        onClick={() => {
          window.history.back();
        }}
      >
        Retour
      </Button>
      <div className="h-full w-full  bg-blue-900  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center rounded-lg overflow-hidden cursor-pointer p-2 ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-2xl mx-auto p-4 flex flex-col justify-center items-center gap-3">
          <h1 className="relative z-10 text-3xl md:text-6xl  bg-clip-text text-transparent bg-foreground  text-center font-sans font-bold">
            Partagez ce lien avec <br />{" "}
            <span className="text-primary">un ami</span>
          </h1>
          <p></p>
          <Tooltip content="Copier le lien">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => {
                navigator.clipboard.writeText(lien);
                toast("Lien copié dans le presse-papier");
              }}
              className="px-3 py-2 bg-black/35 rounded-xl hover:bg-success/35 transition-all flex items-center gap-2 text-center"
            >
              {lien}
              <div
                style={{
                  display: hover ? "block" : "none",
                }}
              >
                <Copy />
              </div>
            </div>
          </Tooltip>

          <QRCode
            value={lien}
            size={150}
            className="mt-3 rounded-xl shadow-xl"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
