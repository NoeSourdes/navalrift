import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
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
        <main className="text-foreground bg-background">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
