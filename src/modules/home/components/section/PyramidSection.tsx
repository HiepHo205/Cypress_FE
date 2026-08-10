"use client";

import { useState, useMemo, useRef, useEffect } from "react";

import { PYRAMID_CONFIG } from "./pyramid.config";
import MobileIndicator from "./MobileIndicator";
import { cn } from "@/src/utils/utils";

interface ServiceItem {
  step: string;
  name: string;
  packageLabel: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  className?: string;
  data: {
    label: string;
    headline: string;
    subHeadline: string;
    services: ServiceItem[];
  };
}

export default function PyramidSection({
  className,
  data,
}: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const services = useMemo(
    () => [...data.services].sort((a, b) => Number(b.step) - Number(a.step)),
    [data.services],
  );

  const [activeIndex, setActiveIndex] = useState(
    Math.max(services.length - 1, 0),
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1279.98px)");

    const update = () => setIsMobile(mql.matches);

    update();

    mql.addEventListener("change", update);

    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isVisible || !isMobile || services.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isVisible, isMobile, activeIndex, services.length]);

  if (!services.length) {
    return null;
  }

  const activeService = services[activeIndex];

  const activeStep = Number(activeService.step);

  const activePyramid =
    PYRAMID_CONFIG[activeService.step as keyof typeof PYRAMID_CONFIG];

  return (
    <section
      ref={sectionRef}
      id="services"
      className={cn(
        "w-full bg-[#F2F5FB]",
        "px-[16px] py-[40px]",
        "md:px-[40px]",
        "xl:px-[120px] xl:py-[80px]",
        className,
      )}
    >
      <div className="w-full">
        <div className="mx-auto mb-[32px] text-center">
          <span className="text-base leading-[28px] uppercase text-[#2B71D3]">
            {data.label}
          </span>

          <h2 className="mt-[8px] mb-[16px] text-[24px] font-bold leading-[32px] text-[#232323] md:text-[36px] md:leading-[40px]">
            {data.headline}
          </h2>

          <p className="text-base leading-[28px] text-[#757575]">
            {data.subHeadline}
          </p>
        </div>

        <div className="hidden gap-[8px] xl:flex xl:flex-col">
          {services.map((service, index) => {
            const pyramid =
              PYRAMID_CONFIG[service.step as keyof typeof PYRAMID_CONFIG];

            return (
              <div
                key={service.step}
                className="group grid w-full items-center gap-[16px] xl:grid-cols-[160px_minmax(0,488px)_minmax(0,1fr)]"
              >
                <div className={cn("flex", pyramid.stepOffsetClass)}>
                  <div
                    className={cn(
                      "flex items-center",
                      "transition-transform duration-300",
                      "group-hover:scale-[1.16]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-[102px] w-[102px] items-center justify-center rounded-full",
                        "text-center text-[20px] font-bold leading-[28px] tracking-[-0.03em]",
                        pyramid.textClass,
                      )}
                      style={{
                        backgroundColor: pyramid.color,
                      }}
                    >
                      {service.step}
                    </div>

                    <div
                      className={cn(
                        "ml-[-18px] h-[42px] w-[82px] origin-left",
                        "transition-transform duration-300",
                        "group-hover:scale-x-[1.64]",
                        "[clip-path:polygon(0_0,100%_0,75%_100%,0_100%)]",
                      )}
                      style={{
                        backgroundColor: pyramid.color,
                      }}
                    />
                  </div>
                </div>

                <div className="relative h-[128px] w-full max-w-[488px]">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 460 120"
                    preserveAspectRatio="none"
                  >
                    <path d={pyramid.path} fill={pyramid.color} />
                  </svg>

                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-1",
                      "text-center tracking-[-0.03em]",
                      pyramid.textClass,
                      service.step === "04" && "pt-[28px]",
                    )}
                  >
                    <span className="text-[18px] font-semibold leading-[28px] text-[#0D223F]">
                      {service.packageLabel}
                    </span>

                    <span className="font-inter text-[14px] font-normal leading-[24px] text-[#225AA9]">
                      {service.name}
                    </span>
                  </div>
                </div>

                <div className="flex h-[128px] w-full gap-[24px]">
                  <div
                    className="w-[2px] shrink-0 self-stretch"
                    style={{
                      backgroundColor: pyramid.color,
                    }}
                  />

                  <div
                    className={cn(
                      "flex h-full min-w-0 flex-1 flex-col justify-start pr-[8px]",
                      isVisible && "service-detail-slide-in",
                    )}
                    style={{
                      animationDelay: `${(index + 1) * 250}ms`,
                    }}
                  >
                    <h3
                      className={cn(
                        "mb-[8px]",
                        "text-[16px] font-semibold leading-[28px] tracking-normal text-[#232323]",
                        "transition-colors duration-300",
                        "group-hover:text-[#2B71D3]",
                      )}
                    >
                      <span>{service.name}</span> - <span>{service.title}</span>
                    </h3>

                    <p className="line-clamp-3 text-[16px] font-normal leading-[28px] tracking-normal text-[#757575]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="xl:hidden">
          <div className="flex w-full flex-col gap-[4px]">
            {services.map((service, index) => {
              const pyramid =
                PYRAMID_CONFIG[service.step as keyof typeof PYRAMID_CONFIG];

              const isActive = activeIndex === index;

              return (
                <div
                  key={service.step}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "grid cursor-pointer items-center gap-0",
                    "grid-cols-[90px_280px]",
                    "sm:grid-cols-[90px_minmax(0,280px)_minmax(0,1fr)]",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-end",
                      pyramid.mobileStepOffsetClass,
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-[54px] w-[54px] items-center justify-center rounded-full",
                        "text-[16px] font-bold",
                        "transition-transform duration-300",
                        pyramid.textClass,
                        isActive && "scale-[1.2]",
                      )}
                      style={{
                        backgroundColor: pyramid.color,
                      }}
                    >
                      {service.step}
                    </div>

                    <div
                      className={cn(
                        "ml-[-12px] h-[24px] w-[48px] shrink-0 origin-left",
                        "[clip-path:polygon(0_0,100%_0,72%_100%,0_100%)]",
                        "transition-transform duration-300",
                        isActive && "scale-x-[2]",
                      )}
                      style={{
                        backgroundColor: pyramid.color,
                      }}
                    />
                  </div>

                  <div className="relative h-[72px] w-[270px]">
                    <svg
                      className="absolute inset-0 h-full w-full"
                      viewBox="0 0 270 72"
                      preserveAspectRatio="none"
                    >
                      <path d={pyramid.mobilePath} fill={pyramid.color} />
                    </svg>

                    <div
                      className={cn(
                        "absolute inset-0 z-10 flex flex-col items-center justify-center",
                        "text-center",
                        pyramid.textClass,
                        service.step === "04" && "pt-[28px]",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[7.79px] font-normal leading-[13.36px]",
                          pyramid.subTextClass,
                        )}
                      >
                        {service.packageLabel}
                      </span>

                      <span className="text-[14px] font-normal leading-[24px] text-[#225AA9]">
                        {service.name}
                      </span>
                    </div>
                  </div>

                  <div className="hidden h-[72px] w-full gap-[24px] sm:flex xl:hidden">
                    <div
                      className="w-[2px] shrink-0 self-stretch"
                      style={{
                        backgroundColor: pyramid.color,
                      }}
                    />

                    <div
                      className={cn(
                        "flex h-full min-w-0 flex-1 flex-col pr-[8px]",
                        isVisible && "service-detail-slide-in",
                      )}
                      style={{
                        animationDelay: `${(index + 1) * 250}ms`,
                      }}
                    >
                      <h3
                        className={cn(
                          "mb-[4px]",
                          "text-[12px] font-semibold leading-[16px] tracking-normal text-[#232323]",
                          "transition-colors duration-300",
                          isActive && "text-[#2B71D3]",
                        )}
                      >
                        <span>{service.name}</span> -{" "}
                        <span>{service.title}</span>
                      </h3>

                      <p className="line-clamp-3 text-[12px] font-normal leading-[16px] tracking-normal text-[#757575]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-[24px] flex gap-4 sm:hidden">
            <div
              className="w-[4px] rounded-[8px]"
              style={{
                backgroundColor: activePyramid.color,
              }}
            />

            <div>
              <h3 className="text-[16px] font-semibold leading-[28px] tracking-normal text-[#232323]">
                <span>{activeService.name}</span> -{" "}
                <span>{activeService.title}</span>
              </h3>

              <p className="mt-[8px] text-[16px] font-normal leading-[28px] tracking-normal text-[#757575]">
                {activeService.description}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:hidden">
            <MobileIndicator
              services={services}
              activeStep={activeStep}
              onChange={setActiveIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
