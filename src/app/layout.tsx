import { AppWrapper } from "@/context";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers/providers";

export const metadata: Metadata = {
  title: "NavalRift",
  description: "La plateforme de commandement ultime pour les amiraux modernes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="fr">
      <body className={GeistSans.className}>
        <SessionProvider>
          <AppWrapper>
            <main className="text-foreground bg-background">
              <Providers>
                <Toaster richColors />
                {children}
              </Providers>
            </main>
          </AppWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
