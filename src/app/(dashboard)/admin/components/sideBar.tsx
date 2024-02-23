"use client";

import { useButtonSounds } from "@/app/actions/sound/sound";
import {
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
  useDisclosure,
} from "@nextui-org/react";

import { AreaChart, Home, MessageSquareMore, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ButtonSideBar from "./buttonSideBar";

interface SideBarProps {
  session: any;
}

export const SideBar = ({ session }: SideBarProps) => {
  const { play, playHover } = useButtonSounds();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    play();
    await signOut({ callbackUrl: "/sign-in" });
    setLoading(false);
  };

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
        <div className="mt-5 flex flex-col gap-2">
          <ButtonSideBar logo={Home} title="Acceuil" />
          <ButtonSideBar logo={MessageSquareMore} title="Messagerie" />
          <ButtonSideBar logo={AreaChart} title="Statistiques" />
        </div>
      </div>
      <div>
        <ButtonSideBar logo={Settings} title="Paramètres" modal={true} />
        <Divider className="mt-4" />
        <div className="pl-1 pt-5">
          <Dropdown placement="bottom-start">
            <DropdownTrigger
              className="flex items-center gap-3"
              onClick={() => play()}
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
                onClick={() => play()}
                key="profil"
                className="h-14 gap-2"
              >
                <p className="font-bold">Connecté en tant que</p>
                <p className="text-gray-400">{session?.user?.email}</p>
              </DropdownItem>
              <DropdownItem
                onMouseEnter={() => playHover()}
                onClick={() => play}
                key="Mon_profile"
              >
                Mon Profile
              </DropdownItem>
              <DropdownItem
                onMouseEnter={() => playHover()}
                onClick={() => play}
                key="aide_et_retour"
              >
                Aide & Retour
              </DropdownItem>
              <DropdownItem
                onMouseEnter={() => playHover()}
                key="deconnexion"
                color="danger"
                onPress={() => {
                  onOpen();
                  play();
                }}
              >
                Se Déconnecter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3>Se Déconnecter</h3>
              </ModalHeader>
              <ModalBody>
                <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onMouseEnter={() => playHover()}
                  color="danger"
                  variant="ghost"
                  onPress={() => {
                    onClose();
                    play();
                  }}
                >
                  Annuler
                </Button>
                <Button
                  isLoading={loading}
                  disabled={loading}
                  color="primary"
                  onPress={handleLogout}
                  onMouseEnter={() => playHover()}
                >
                  Se Déconnecter
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
