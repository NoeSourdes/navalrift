"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { Settings } from "lucide-react";
import Image from "next/image";
import ButtonSideBar from "./buttonSideBar";

interface SideBarProps {
  session: any;
}

export const SideBar = ({ session }: SideBarProps) => {
  const { playBottomButton, playHover } = useButtonSounds();
  return (
    <div className="h-full w-full rounded-xl bg-[#001731] flex flex-col justify-between px-5 py-7">
      <div className="">
        <div className="flex items-center gap-3">
          <Image
            src="/img/logo-navalRift.png"
            alt="logo"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold">
            Naval<span className="text-primary">Rift</span>
          </h1>
        </div>
      </div>
      <div>
        <ButtonSideBar logo={Settings} title="Paramètres" modal={true} />
        <Divider className="mt-4" />
        <div className="pl-1 pt-5">
          <Dropdown placement="bottom-start">
            <DropdownTrigger
              className="flex items-center gap-3"
              onClick={() => playBottomButton()}
            >
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: session?.user?.image
                    ? session?.user?.image
                    : "/img/avatar.png",
                }}
                className="transition-transform"
                description={session?.user?.email}
                name={session?.user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem
                onMouseEnter={() => playHover()}
                key="profil"
                className="h-14 gap-2"
              >
                <p className="font-bold">Connecté en tant que</p>
                <p className="text-gray-400">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem onMouseEnter={() => playHover()} key="Mon_profile">
                Mon Profile
              </DropdownItem>
              <DropdownItem
                onMouseEnter={() => playHover()}
                key="aide_et_retour"
              >
                Aide & Retour
              </DropdownItem>
              <DropdownItem
                onMouseEnter={() => playHover()}
                key="deconnexion"
                color="danger"
              >
                Se Déconnecter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
