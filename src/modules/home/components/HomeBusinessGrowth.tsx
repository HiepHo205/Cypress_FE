"use client";

import { useHome } from "../hooks/useHome";
import { PyramidSection } from "./section";
import { Loading } from "@/src/components/common";

export default function HomeBusinessGrowth() {
  const { homepage, loading } = useHome();

  const businessGrowth = homepage?.businessGrowth;

  if (loading) {
    return (
      <section className="relative w-full bg-[#F2F5FB] py-20">
        <Loading show fullScreen={false} message="Loading business growth..." />
      </section>
    );
  }

  if (!businessGrowth) {
    return null;
  }

  const pyramidData = {
    label: businessGrowth.label,
    headline: businessGrowth.title,
    subHeadline: businessGrowth.description,

    services: businessGrowth.packages.map((item) => ({
      step: String(item.number).padStart(2, "0"),
      name: item.packageName,
      packageLabel: item.title,
      title: item.headline,
      description: item.description,
    })),
  };

  return <PyramidSection data={pyramidData} />;
}
