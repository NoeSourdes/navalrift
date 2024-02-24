"use client";

import { useSession } from "next-auth/react";
import React from "react";
import PageConnect from "./components/pageConnect";
import PageNoConnect from "./components/pageNoConnect";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { status } = useSession();
  const lien = window.location.href;
  console.log(lien);
  return (
    <>
      {status === "authenticated" ? (
        <PageConnect>{children}</PageConnect>
      ) : (
        <PageNoConnect lien={lien}>{children}</PageNoConnect>
      )}
    </>
  );
}
