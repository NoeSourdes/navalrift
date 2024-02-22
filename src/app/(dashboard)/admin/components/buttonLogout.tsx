"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export const ButtonLogout = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</Button>
  );
};
