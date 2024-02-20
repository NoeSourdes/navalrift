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

export const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const elementsMenu = [
    "Accueil",
    "Fonctionnalités",
    "Jeux",
    "Connexion",
    "Inscription",
    "À propos de nous",
    "Contactez-nous",
    "Conditions d'utilisation",
    "Politique de confidentialité",
    "Politique des cookies",
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
        <NavbarItem isActive>
          <Link color="primary" href="#">
            Accueil
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Fonctionnalités
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Jeux
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Connexion</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Inscription
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {elementsMenu.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === elementsMenu.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
