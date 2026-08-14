"use client";

import type {
  CaseStudyCategory,
  CaseStudySidebarProps,
} from "../types/case-study.types";

export default function CaseStudySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}: CaseStudySidebarProps) {
  return (
    <aside className="w-[282px] shrink-0">
      <div className="w-[282px] rounded-[9px] bg-[#f4f7fd] px-4 py-5">
        {categories.map((category) => {
          const isAllSelected =
            selectedCategory === "All" || selectedCategory === category.title;

          return (
            <div key={category.id} className="mb-5 last:mb-0">
              <h2 className="mb-3 font-['Inter'] text-[24px] font-bold leading-[30px] text-[#222]">
                {category.title}
              </h2>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() =>
                      onCategoryChange(isAllSelected ? "All" : category.title)
                    }
                    className="h-[14px] w-[14px] cursor-pointer accent-[#2874d0]"
                  />

                  <span className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#444]">
                    All {category.title}
                  </span>
                </label>

                <div className="space-y-3 pl-0">
                  {category.children.map((child) => {
                    const checked = selectedCategory === child.name;

                    return (
                      <label
                        key={child.id}
                        className="flex cursor-pointer items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            onCategoryChange(checked ? "All" : child.name)
                          }
                          className="h-[14px] w-[14px] cursor-pointer accent-[#2874d0]"
                        />

                        <span className="font-['Inter'] text-[16px] font-normal leading-[20px] text-[#444]">
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
