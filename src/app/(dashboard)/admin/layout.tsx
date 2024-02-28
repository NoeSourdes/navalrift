"use client";

import { getGroupsUser } from "@/app/actions/users/groupe";
import { useAppContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PageConnect from "./components/pageConnect";
import PageNoConnect from "./components/pageNoConnect";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { sockets } = useAppContext();
  const { status } = useSession();
  const [lien, setLien] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLien(window.location.href);
    }
  }, []);
  useEffect(() => {
    if (session) {
      getGroupUser();
    }
  }, [session]);
  const getGroupUser = async () => {
    const user_id = session?.user?.id ? session.user.id : "";
    const groups = await getGroupsUser(user_id);
    sockets.emit("join_groups", groups);
  };
  useEffect(() => {
    sockets.on("notification", (data: any) => {
      console.log(data.message);
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
