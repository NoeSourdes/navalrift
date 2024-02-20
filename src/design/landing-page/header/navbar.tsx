"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

interface NavbarComponentProps {
  isCallToActionVisible: boolean;
  isFeaturesVisible: boolean;
  isPriceVisible: boolean;
  scrollToFeatures: () => void;
  scrollToPrice: () => void;
  scrollToTop: () => void;
}

export const NavbarComponent = ({
  isCallToActionVisible,
  isFeaturesVisible,
  isPriceVisible,
  scrollToFeatures,
  scrollToPrice,
  scrollToTop,
}: NavbarComponentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const elementsMenu = [
    "Accueil",
    "Fonctionnalités",
    "Jeux",
    "Connexion",
    "Inscription",
    "Termes",
    "Confidentialité",
    "Cookies",
    "Mentions légales",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="h-20 bg-opacity-25 bg-background"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image
            src="/svg/logo-navalRift.svg"
            alt="NavalRift"
            width={70}
            height={70}
          />
          <p className="font-bold text-inherit text-2xl">
            Naval<span className="text-primary">Rift</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isCallToActionVisible}>
          <Link
            color={isCallToActionVisible ? "primary" : "foreground"}
            onClick={scrollToTop}
            className={"cursor-pointer"}
          >
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isFeaturesVisible}>
          <Link
            onClick={scrollToFeatures}
            color={isFeaturesVisible ? "primary" : "foreground"}
            className="cursor-pointer"
          >
            Fonctionnalités
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isPriceVisible}>
          <Link
            onClick={scrollToPrice}
            color={isPriceVisible ? "primary" : "foreground"}
            className="cursor-pointer"
          >
            Tarifs
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/sign-in">Connexion</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/sign-up" variant="flat">
            Inscription
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {elementsMenu.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="foreground" className="w-full" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
