"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import PageConnect from "./components/pageConnect";
import PageNoConnect from "./components/pageNoConnect";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sockets } = useAppContext();
  const { status } = useSession();
  const [lien, setLien] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLien(window.location.href);
    }
  }, []);
  useEffect(() => {
    sockets.on("notification", (data: any) => {
      console.log(data.message);
      toast(data.message);
    });
    return () => {
      sockets.off("notification");
    };
  }, []);

  return (
    <>
      {status === "authenticated" ? (
        <PageConnect>{children}</PageConnect>
      ) : (
        <div className=" overflow-y-auto">
          <PageNoConnect lien={lien}>{children}</PageNoConnect>
        </div>
      )}
    </>
  );
}
