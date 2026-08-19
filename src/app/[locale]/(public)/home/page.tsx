"use client";

import {
  HeroSection,
  HomeCaseStudy,
  HomeIntro,
  HomeWhyChooseCypress,
  HomePricingBanner,
  HomeSuccessStories,
  HomeNews,
  HomeContact,
  HomeBusinessGrowth,
  LaunchOffer,
} from "@/src/modules/home/components";

export default function HomePage() {
  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <HomeBusinessGrowth />
      <HomeIntro />
      <HomeCaseStudy />
      <HomeWhyChooseCypress />
      <HomePricingBanner />
      <HomeSuccessStories />
      <HomeNews />
      <LaunchOffer />
      <HomeContact />
    </main>
  );
}
