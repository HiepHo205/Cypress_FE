"use client";

import Image from "next/image";
import { useHome } from "../hooks/useHome";
import { Loading } from "@/src/components/common";

export default function HomeContact() {
  const { homepage, loading } = useHome();

  const homepageContact = homepage?.contact;

  if (loading) {
    return (
      <section className="relative w-full py-16">
        <Loading show fullScreen={false} message="Loading contact..." />
      </section>
    );
  }

  if (!homepageContact) {
    return (
      <section className="w-full py-20 text-center text-gray-500">
        No contact data
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-[48px] md:py-[80px]">
      <div
        className="
                mx-auto
                flex
                w-full
                max-w-[1199px]
                flex-col
                items-stretch
                gap-[32px]
                px-[16px]
                md:flex-row
                md:items-center
                md:gap-[24px]
                md:px-0
            "
      >
        <div
          className="
                    relative
                    h-[400px]
                    w-full
                    shrink-0
                    overflow-hidden
                    rounded-[16px]
                    md:h-[609px]
                    md:w-[513px]
                "
        >
          <Image
            src={homepageContact.image?.url || "/placeholder.jpg"}
            alt={homepageContact.title || "Contact"}
            fill
            sizes="(max-width: 768px) 100vw, 513px"
            className="object-cover"
          />

          <div
            className="
                        absolute
                        bottom-[16px]
                        left-[16px]
                        right-[16px]
                        min-h-[120px]
                        rounded-[16px]
                        bg-[#D6D6D63D]
                        p-[16px]
                        md:left-[24px]
                        md:right-auto
                        md:h-[136px]
                        md:w-[465px]
                    "
          >
            <h3
              className="
                            font-inter
                            text-[20px]
                            font-semibold
                            leading-[28px]
                            text-[#EDEDED]
                            md:text-[24px]
                            md:leading-[32px]
                        "
            >
              {homepageContact.title}
            </h3>

            <p
              className="
                            mt-[8px]
                            font-inter
                            text-[14px]
                            font-normal
                            leading-[22px]
                            tracking-[0.08em]
                            text-[#EDEDED]
                            md:text-[16px]
                            md:leading-[28px]
                            md:tracking-[0.12em]
                        "
            >
              {homepageContact.description}
            </p>
          </div>
        </div>

        <div
          className="
                    flex
                    w-full
                    shrink-0
                    items-center
                    md:w-[647px]
                "
        >
          <form className="w-full md:w-[647px]">
            <div
              className="
                            grid
                            w-full
                            grid-cols-1
                            gap-x-[16px]
                            gap-y-[20px]
                            md:grid-cols-2
                        "
            >
              {homepageContact.labels.map((label, index) => {
                const title = label.title?.toLowerCase() ?? "";

                const isTextarea =
                  label.type === "textarea" || title.includes("message");

                const isSelect = label.type === "select";

                const isPhone = title.includes("phone");

                const isTwoColumn = index < 4;

                return (
                  <div
                    key={label.id}
                    className={
                      isTwoColumn && !isTextarea
                        ? `
                                                col-span-1
                                                w-full
                                                md:w-[315.5px]
                                            `
                        : `
                                                col-span-1
                                                w-full
                                                md:col-span-2
                                                md:w-[647px]
                                            `
                    }
                  >
                    <label
                      className="
                                            mb-[8px]
                                            block
                                            font-inter
                                            text-[14px]
                                            font-medium
                                            leading-[20px]
                                            text-[#222222]
                                        "
                    >
                      {label.title}

                      {(title.includes("name") ||
                        title.includes("email") ||
                        title.includes("phone")) && (
                        <span className="ml-[2px]">*</span>
                      )}
                    </label>

                    {!isTextarea && !isSelect && (
                      <div
                        className={
                          isPhone
                            ? `
                                                        flex
                                                        h-[44px]
                                                        w-full
                                                        overflow-hidden
                                                        rounded-[8px]
                                                        bg-[#F1F1F1]
                                                        md:w-[315.5px]
                                                    `
                            : "w-full"
                        }
                      >
                        {isPhone && (
                          <button
                            type="button"
                            className="
                                                        flex
                                                        h-full
                                                        shrink-0
                                                        items-center
                                                        gap-[5px]
                                                        border-r
                                                        border-white
                                                        px-[12px]
                                                        font-inter
                                                        text-[12px]
                                                        text-[#555555]
                                                    "
                          >
                            <span>(+84)</span>

                            <svg
                              width="8"
                              height="5"
                              viewBox="0 0 8 5"
                              fill="none"
                            >
                              <path
                                d="M1 1L4 4L7 1"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        )}

                        <input
                          type={label.type || "text"}
                          placeholder={label.placeholder}
                          className="
                                                    h-[44px]
                                                    w-full
                                                    min-w-0
                                                    rounded-[8px]
                                                    border-0
                                                    bg-[#F1F1F1]
                                                    px-[12px]
                                                    font-inter
                                                    text-[14px]
                                                    font-normal
                                                    text-[#333333]
                                                    outline-none
                                                    placeholder:text-[#999999]
                                                "
                        />
                      </div>
                    )}

                    {isSelect && (
                      <div className="relative w-full">
                        <select
                          defaultValue=""
                          className="
                                                    h-[44px]
                                                    w-full
                                                    appearance-none
                                                    rounded-[8px]
                                                    border-0
                                                    bg-[#F1F1F1]
                                                    px-[12px]
                                                    pr-[36px]
                                                    font-inter
                                                    text-[14px]
                                                    font-normal
                                                    text-[#999999]
                                                    outline-none
                                                "
                        >
                          <option value="" disabled>
                            {label.placeholder}
                          </option>

                          {label.options?.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>

                        <svg
                          className="
                                                    pointer-events-none
                                                    absolute
                                                    right-[14px]
                                                    top-1/2
                                                    -translate-y-1/2
                                                "
                          width="9"
                          height="6"
                          viewBox="0 0 9 6"
                          fill="none"
                        >
                          <path
                            d="M1 1L4.5 4.5L8 1"
                            stroke="#555555"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}

                    {isTextarea && (
                      <textarea
                        placeholder={label.placeholder}
                        className="
                                                h-[88px]
                                                w-full
                                                resize-none
                                                rounded-[8px]
                                                border-0
                                                bg-[#F1F1F1]
                                                px-[12px]
                                                py-[10px]
                                                font-inter
                                                text-[14px]
                                                font-normal
                                                leading-[20px]
                                                text-[#333333]
                                                outline-none
                                                placeholder:text-[#999999]
                                                md:w-[647px]
                                            "
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <p
              className="
                            mt-[20px]
                            w-full
                            font-inter
                            text-[14px]
                            font-normal
                            leading-[22px]
                            tracking-[0.08em]
                            text-[#222222]
                            md:w-[647px]
                            md:text-[16px]
                            md:leading-[28px]
                            md:tracking-[0.12em]
                        "
            >
              By submitting this form, you agree to our{" "}
              <a
                href={homepageContact.termsUrl}
                className="underline underline-offset-[3px]"
              >
                {homepageContact.termsLabel}
              </a>
            </p>

            {homepageContact.buttonText && homepageContact.buttonUrl && (
              <a
                href={homepageContact.buttonUrl}
                className="
      mt-[24px]
      inline-flex
      h-[48px]
      w-full
      items-center
      justify-center
      rounded-[8px]
      bg-[#2F73D9]
      px-[20px]
      font-inter
      text-[14px]
      font-semibold
      text-white
      transition-colors
      hover:bg-[#2464C5]
      md:w-[215px]
    "
              >
                {homepageContact.buttonText}
              </a>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
