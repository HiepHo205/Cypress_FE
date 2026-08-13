"use client";

import type { NewsPage } from "../types/news.types";

interface NewsHeroProps {
  news: NewsPage;
}

export default function NewsHero({ news }: NewsHeroProps) {
  const banner =
    typeof news?.banner === "string" ? JSON.parse(news.banner) : news?.banner;

  if (!banner) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#eaf2fd]">
      <div className="absolute inset-0 opacity-40">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexagons"
              width="48"
              height="42"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 1 L45 12.5 L45 29.5 L24 41 L3 29.5 L3 12.5 Z"
                fill="none"
                stroke="#d5e2f3"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div
        className="
                    relative
                    mx-auto
                    flex
                    min-h-[464px]
                    w-full
                    max-w-[1440px]
                    items-center
                    px-6
                    py-16
                    sm:px-10
                    sm:py-20
                    lg:px-[120px]
                    lg:pt-[112px]
                    lg:pb-[80px]
                "
      >
        <div className="relative z-10 flex w-full max-w-[749px] flex-col gap-6">
          <div
            className="
                            flex
                            items-center
                            gap-3
                            font-['Inter']
                            text-[16px]
                            font-medium
                            leading-7
                            text-[#667085]
                        "
          >
            <a
              href={banner.breadcrumb_first_url || "/"}
              className="transition hover:text-[#4f88d6]"
            >
              {banner.breadcrumb_first}
            </a>

            <span>/</span>

            <a
              href={banner.breadcrumb_second_url || "/news"}
              className="transition hover:text-[#4f88d6]"
            >
              {banner.breadcrumb_second}
            </a>
          </div>

          <h1
            className="
                            w-full
                            max-w-[749px]
                            font-['Inter']
                            text-[40px]
                            font-bold
                            leading-[48px]
                            tracking-[-1px]
                            text-[#20252b]
                            sm:text-[48px]
                            sm:leading-[56px]
                            lg:text-[54px]
                            lg:leading-[64px]
                        "
          >
            {banner.title}
          </h1>

          <p
            className="
                            max-w-[749px]
                            font-['Inter']
                            text-[16px]
                            font-medium
                            leading-7
                            text-[#59636f]
                            sm:text-[18px]
                            sm:leading-7
                        "
          >
            {banner.description}
          </p>
        </div>

        <div
          className="
                        pointer-events-none
                        absolute
                        right-[60px]
                        top-1/2
                        hidden
                        h-[300px]
                        w-[430px]
                        -translate-y-1/2
                        md:block
                        lg:right-[80px]
                        xl:right-[100px]
                    "
        >
          <div
            className="
                            absolute
                            right-[15px]
                            top-[105px]
                            h-[125px]
                            w-[300px]
                            rotate-[10deg]
                            rounded-[50%]
                            border
                            border-dashed
                            border-[#74a7e8]
                        "
          />

          <div
            className="
                            absolute
                            right-[20px]
                            top-[85px]
                            h-[170px]
                            w-[300px]
                            -rotate-[18deg]
                            rounded-[50%]
                            border
                            border-dashed
                            border-[#74a7e8]
                        "
          />

          <div
            className="
                            absolute
                            right-[75px]
                            top-[20px]
                            h-[220px]
                            w-[220px]
                            overflow-hidden
                            rounded-full
                            bg-gradient-to-br
                            from-[#b9d4f7]
                            via-[#8eb9ed]
                            to-[#6e9edc]
                            shadow-[0_12px_40px_rgba(70,120,190,0.15)]
                        "
          >
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-1/2 h-full w-[1px] -translate-x-1/2 bg-white" />

              <div className="absolute left-[25%] h-full w-[1px] rotate-[12deg] bg-white" />

              <div className="absolute left-[75%] h-full w-[1px] -rotate-[12deg] bg-white" />

              <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-white" />

              <div className="absolute left-[-10%] right-[-10%] top-[28%] h-[1px] rotate-[5deg] bg-white" />

              <div className="absolute left-[-10%] right-[-10%] top-[72%] h-[1px] -rotate-[5deg] bg-white" />
            </div>

            <div
              className="
                                absolute
                                left-[32px]
                                top-[52px]
                                h-[48px]
                                w-[78px]
                                rotate-[15deg]
                                rounded-[50%_30%_45%_35%]
                                bg-[#6f9fda]/60
                            "
            />

            <div
              className="
                                absolute
                                right-[30px]
                                top-[70px]
                                h-[65px]
                                w-[48px]
                                rotate-[25deg]
                                rounded-[40%_60%_35%_55%]
                                bg-[#6f9fda]/60
                            "
            />

            <div
              className="
                                absolute
                                bottom-[32px]
                                left-[82px]
                                h-[45px]
                                w-[34px]
                                rotate-[15deg]
                                rounded-[40%_50%_60%_35%]
                                bg-[#6f9fda]/50
                            "
            />

            <div
              className="
                                absolute
                                left-[24px]
                                top-[16px]
                                h-[110px]
                                w-[70px]
                                rounded-full
                                bg-white/15
                                blur-md
                            "
            />
          </div>

          <div
            className="
                            absolute
                            right-[105px]
                            top-[105px]
                            flex
                            h-[24px]
                            w-[24px]
                            items-center
                            justify-center
                            rounded-full
                            bg-[#4f88d6]
                            shadow-md
                        "
          >
            <div className="h-[8px] w-[8px] rounded-full bg-white" />
          </div>

          <div
            className="
                            absolute
                            left-[45px]
                            top-[78px]
                            rotate-[-8deg]
                            scale-[1.4]
                        "
          >
            <svg
              width="58"
              height="32"
              viewBox="0 0 58 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 14L22 13L43 5L55 8L39 16L55 21L52 24L32 18L18 20L11 17L2 18L7 14H2Z"
                fill="#4F88D6"
              />

              <path d="M22 13L26 4L31 3L31 13" fill="#4F88D6" />
            </svg>
          </div>

          <div
            className="
                            absolute
                            bottom-[35px]
                            right-[130px]
                            flex
                            h-[22px]
                            w-[22px]
                            items-center
                            justify-center
                            rounded-full
                            bg-[#4f88d6]
                        "
          >
            <div className="h-[6px] w-[6px] rounded-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
