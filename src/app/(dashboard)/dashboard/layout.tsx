"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PageConnect from "./components/pageConnect";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sockets, setLien } = useAppContext();
  const { status } = useSession();
  const router = useRouter();
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const urlModdif = url.pathname + url.search;
    setLien(urlModdif);
  }

  useEffect(() => {
    sockets.on("notification", (data: any) => {
      console.log(data.message);
    });
    return () => {
      sockets.off("notification");
    };
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {status === "authenticated" && (
        <PageConnect>
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </PageConnect>
      )}
    </>
  );
}
