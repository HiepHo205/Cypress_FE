"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import HeaderCountdown from "./HeaderCountdown";
import { useHeader } from "@/src/modules/header";
import { useHeaderCountdown } from "@/src/modules/header/hooks/useHeaderCountdown";

export default function HeaderMain() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { countdown } = useHeaderCountdown();
  const { header, loading, error } = useHeader();

  if (loading) {
    return (
      <header className="h-[81px] w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]" />
    );
  }

  if (error) {
    return (
      <header className="p-4 text-center text-red-500">
        Failed to load header.
      </header>
    );
  }

  if (!header) {
    return null;
  }

  const menu = header.menus ?? [];
  const cta = header.cta;

  const logo = header.logo || "/images/logo_cypress.png";

  const handleMenuClick = (id: string) => {
    setOpenSubMenu((prev) => (prev === id ? null : id));
  };

  return (
    <header className="w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="mx-auto h-[81px] max-w-[1440px] px-5 lg:px-10">
        <div className="hidden h-full items-center lg:grid lg:grid-cols-3">
          <div className="flex items-center gap-8">
            {menu.map((item) => {
              const isOpen = openSubMenu === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className="flex items-center gap-2 text-[18px] font-medium text-[#232323]"
                  >
                    {item.label}

                    <ChevronDown
                      size={18}
                      className={`transition ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`
                      absolute left-0 top-full z-50 mt-5
                      w-[245px]
                      rounded-xl
                      bg-white
                      py-4
                      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                      transition-all
                      ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }
                    `}
                  >
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href ?? "#"}
                        className="block px-5 py-3 text-[18px] text-gray-800 hover:bg-gray-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <img src={logo} alt="Logo Cypress" className="h-[70px]" />
          </div>

          <div className="flex items-center justify-end gap-5">
            <HeaderCountdown
              targetDate={header.countdown?.target_date}
              enabled={header.countdown?.enabled}
            />

            <Link
              href={cta?.href ?? "#"}
              className="flex h-10 items-center rounded-lg bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
            >
              {cta?.label}
            </Link>
          </div>
        </div>

        <div className="flex h-full items-center justify-between lg:hidden">
          <div className="w-10" />

          <img src={logo} alt="Logo Cypress" className="h-[70px]" />

          <button onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          lg:hidden
          ${openMenu ? "max-h-[1000px]" : "max-h-0"}
        `}
      >
        <div className="bg-black text-white">
          {menu.map((item) => {
            const isOpen = openSubMenu === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className="flex w-full items-center justify-between px-6 py-4"
                >
                  {item.label}

                  <ChevronDown
                    className={isOpen ? "rotate-180 transition" : "transition"}
                  />
                </button>

                {isOpen &&
                  item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={child.href ?? "#"}
                      className="block px-10 py-3 text-gray-300"
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            );
          })}

          <div className="p-6 text-center">
            <HeaderCountdown
              targetDate={header.countdown?.target_date}
              enabled={header.countdown?.enabled}
            />

            <Link
              href={cta?.href ?? "#"}
              className="mt-4 block rounded bg-blue-600 py-3 text-white"
            >
              {cta?.label}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
