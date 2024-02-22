import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { InputsComponentsSignIn } from "./components/inputs";
import { SingInPage } from "./view";

export default function page() {
  return <SingInPage />;
}
