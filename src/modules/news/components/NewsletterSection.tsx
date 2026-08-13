"use client";

import type { NewsPage, NewsNewsletter } from "../types/news.types";

interface NewsletterSectionProps {
  news: NewsPage;
}

export default function NewsletterSection({ news }: NewsletterSectionProps) {
  const newsletter: NewsNewsletter | null = (() => {
    if (!news?.newsletter) {
      return null;
    }

    if (typeof news.newsletter === "string") {
      try {
        return JSON.parse(news.newsletter) as NewsNewsletter;
      } catch {
        return null;
      }
    }

    return news.newsletter;
  })();

  if (!newsletter) {
    return null;
  }

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          className="
                        flex
                        min-h-[360px]
                        flex-col
                        items-center
                        justify-center
                        px-6
                        py-16
                        text-center
                        sm:px-8
                        lg:px-0
                    "
        >
          <h2
            className="
                            max-w-[800px]
                            font-['Inter']
                            text-[32px]
                            font-bold
                            leading-[40px]
                            tracking-[-0.5px]
                            text-[#222]
                            sm:text-[40px]
                            sm:leading-[48px]
                        "
          >
            {newsletter.title}
          </h2>

          <p
            className="
                            mt-5
                            max-w-[680px]
                            font-['Inter']
                            text-[16px]
                            font-medium
                            leading-7
                            text-[#8B8B8B]
                        "
          >
            {newsletter.description}
          </p>

          <form
            action={newsletter.buttonUrl || undefined}
            className="
                            mt-8
                            flex
                            w-full
                            max-w-[560px]
                            flex-col
                            gap-3
                            sm:flex-row
                        "
          >
            <input
              type="email"
              placeholder={newsletter.inputPlaceholder}
              className="
                                h-[48px]
                                flex-1
                                rounded-lg
                                border
                                border-[#E5E7EB]
                                bg-white
                                px-4
                                font-['Inter']
                                text-[14px]
                                font-medium
                                leading-5
                                text-[#222]
                                outline-none
                                transition
                                placeholder:text-[#9CA3AF]
                                focus:border-[#4F8BD8]
                                focus:ring-2
                                focus:ring-[#4F8BD8]/20
                            "
            />

            <button
              type="submit"
              className="
                                h-[48px]
                                shrink-0
                                rounded-lg
                                bg-[#4F8BD8]
                                px-7
                                font-['Inter']
                                text-[14px]
                                font-medium
                                leading-5
                                text-white
                                transition
                                hover:bg-[#3D7CD0]
                            "
            >
              {newsletter.buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
