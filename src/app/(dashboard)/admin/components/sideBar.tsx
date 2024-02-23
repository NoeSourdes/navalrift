"use client";

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
import { ButtonSideBar } from "./buttonSideBar";

interface SideBarProps {
  session: any;
}

export const SideBar = ({ session }: SideBarProps) => {
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
        <ButtonSideBar logo={Settings} title="Paramètres" />
        <Divider className="mt-4" />
        <div className="pl-1 pt-5">
          <Dropdown placement="bottom-start" className="">
            <DropdownTrigger className="flex items-center gap-3">
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
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
