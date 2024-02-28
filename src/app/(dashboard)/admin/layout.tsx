"use client";

import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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

  return (
    <>{status === "authenticated" && <PageConnect>{children}</PageConnect>}</>
  );
}
