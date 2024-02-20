import { CallToAction } from "@/design/landing-page/call-to-action/callToAction";
import { Creator } from "@/design/landing-page/creator/creator";
import { Dashboard } from "@/design/landing-page/dashboard/dashboard";
import { Features } from "@/design/landing-page/features/features";
import { Footer } from "@/design/landing-page/footer/footer";
import { NavbarComponent } from "@/design/landing-page/header/navbar";
import { Price } from "@/design/landing-page/price/price";

export default function Home() {
  return (
    <div className="">
      <NavbarComponent />
      <div className="max-w-7xl px-5 m-auto space-y-20">
        <CallToAction />
        <Dashboard />
        <Features />
        <Price />
        <Creator />
        <Footer />
      </div>
    </div>
  );
}
