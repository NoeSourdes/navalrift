import { auth } from "@/lib/auth";
import { useState } from "react";
import { SideBar } from "./components/sideBar";

interface LayoutAdminProps {
  children: React.ReactNode;
}

export default async function LayoutAdmin({ children }: LayoutAdminProps) {
  const session = await auth();
  return (
    <div className="relative">
      <div className="fixed inset-0 bg-gradient-to-t to-black from-blue-800">
        <div className="fixed top-6 left-6 bottom-6 w-[270px] rounded-xl">
          <SideBar session={session} />
        </div>
        <div className="fixed top-0 right-6 left-[318px] bottom-0 py-6 rounded-xl overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
