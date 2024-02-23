"use client";

import { CallToAction } from "@/design/landing-page/call-to-action/callToAction";
import { Creator } from "@/design/landing-page/creator/creator";
import { Dashboard } from "@/design/landing-page/dashboard/dashboard";
import { Features } from "@/design/landing-page/features/features";
import { Footer } from "@/design/landing-page/footer/footer";
import { NavbarComponent } from "@/design/landing-page/header/navbar";
import { Price } from "@/design/landing-page/price/price";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const callToActionRef = useRef<HTMLDivElement | null>(null);
  const FeaturesRef = useRef<HTMLDivElement | null>(null);
  const PriceRef = useRef<HTMLDivElement | null>(null);
  const [isCallToActionVisible, setIsCallToActionVisible] = useState(true);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  useEffect(() => {
    const callToActionElement = callToActionRef.current;
    const featuresElement = FeaturesRef.current;
    const priceElement = PriceRef.current;

    const callToActionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsCallToActionVisible(true);
        } else {
          setIsCallToActionVisible(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const featuresObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFeaturesVisible(true);
        } else {
          setIsFeaturesVisible(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    const priceObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPriceVisible(true);
        } else {
          setIsPriceVisible(false);
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (callToActionRef.current) {
      callToActionObserver.observe(callToActionRef.current);
    }

    if (FeaturesRef.current) {
      featuresObserver.observe(FeaturesRef.current);
    }

    if (PriceRef.current) {
      priceObserver.observe(PriceRef.current);
    }

    return () => {
      if (callToActionElement) {
        callToActionObserver.unobserve(callToActionElement);
      }
      if (featuresElement) {
        featuresObserver.unobserve(featuresElement);
      }
      if (priceElement) {
        priceObserver.unobserve(priceElement);
      }
    };
  }, []);

  const navbarHeight = 80;

  const scrollToFeatures = () => {
    if (FeaturesRef.current) {
      const topPosition =
        FeaturesRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  const scrollToPrice = () => {
    if (PriceRef.current) {
      const topPosition =
        PriceRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="">
      <div className="h-full relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <NavbarComponent
          isCallToActionVisible={isCallToActionVisible}
          isFeaturesVisible={isFeaturesVisible}
          isPriceVisible={isPriceVisible}
          scrollToFeatures={scrollToFeatures}
          scrollToPrice={scrollToPrice}
          scrollToTop={scrollToTop}
        />
        <div className="max-w-7xl px-5 m-auto space-y-20">
          <div ref={callToActionRef}>
            <CallToAction />
          </div>
          <Dashboard />
          <div ref={FeaturesRef}>
            <Features />
          </div>
          <div ref={PriceRef}>
            <Price />
          </div>
          <Creator />
          <Footer />
        </div>
      </div>
    </div>
  );
}
