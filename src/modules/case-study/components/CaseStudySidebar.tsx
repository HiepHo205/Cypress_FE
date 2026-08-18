"use client";

import type { CaseStudySidebarProps } from "../types/case-study.types";

export default function CaseStudySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: CaseStudySidebarProps) {
  return (
    <aside
      className="
        w-full
        shrink-0

        sm:w-[220px]

        lg:w-[282px]
      "
    >
      <div
        className="
          w-full
          rounded-[9px]
          bg-[#f4f7fd]
          px-4
          py-5

          max-[639px]:
            px-3.5
            py-4

          sm:px-3.5
          sm:py-4

          lg:px-4
          lg:py-5
        "
      >
        {categories.map((category) => {
          const isAllSelected =
            selectedCategory === "All" || selectedCategory === category.title;

          return (
            <div
              key={category.id}
              className="
                mb-5
                last:mb-0

                max-[639px]:mb-4
              "
            >
              {/* Category title */}
              <h2
                className="
                  mb-3
                  font-['Inter']
                  text-[21px]
                  font-bold
                  leading-[27px]
                  text-[#222]

                  max-[639px]:
                    mb-2.5
                    text-[19px]
                    leading-[25px]

                  sm:text-[20px]
                  sm:leading-[26px]

                  lg:text-[24px]
                  lg:leading-[30px]
                "
              >
                {category.title}
              </h2>

              <div className="space-y-3">
                {/* All */}
                <label
                  className="
                    flex
                    min-w-0
                    cursor-pointer
                    items-center
                    gap-2
                  "
                >
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() =>
                      onCategoryChange(isAllSelected ? "All" : category.title)
                    }
                    className="
                      h-[14px]
                      w-[14px]
                      shrink-0
                      cursor-pointer
                      accent-[#2874d0]
                    "
                  />

                  <span
                    className="
                      min-w-0
                      break-words
                      font-['Inter']
                      text-[14px]
                      font-normal
                      leading-[20px]
                      text-[#444]

                      sm:text-[15px]

                      lg:text-[16px]
                    "
                  >
                    All {category.title}
                  </span>
                </label>

                {/* Children */}
                <div className="space-y-3 pl-0">
                  {category.children.map((child) => {
                    const checked = selectedCategory === child.name;

                    return (
                      <label
                        key={child.id}
                        className="
                            flex
                            min-w-0
                            cursor-pointer
                            items-center
                            gap-2
                          "
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            onCategoryChange(checked ? "All" : child.name)
                          }
                          className="
                              h-[14px]
                              w-[14px]
                              shrink-0
                              cursor-pointer
                              accent-[#2874d0]
                            "
                        />

                        <span
                          className="
                              min-w-0
                              break-words
                              font-['Inter']
                              text-[14px]
                              font-normal
                              leading-[20px]
                              text-[#444]

                              sm:text-[15px]

                              lg:text-[16px]
                            "
                        >
                          {child.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
