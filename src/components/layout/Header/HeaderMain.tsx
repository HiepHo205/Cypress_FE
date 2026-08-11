"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import HeaderCountdown from "./HeaderCountdown";
import { useHeader } from "@/src/modules/header";

export default function HeaderMain() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const params = useParams();
  const { header, loading, error } = useHeader();

  if (loading) {
    return null;
  }

  if (error) {
    return <div>Failed to load header.</div>;
  }

  if (!header) {
    return null;
  }

  const menu = header.menus ?? [];
  const cta = header.cta;

  const logo = header.logoData?.logo || "/images/logo_cypress.png";

  const faviconUrl = header.favicon?.url;

  const locale = typeof params.locale === "string" ? params.locale : "vi";

  const getMenuUrl = (url: string | null) => {
    if (!url) {
      return "#";
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    const cleanUrl = url.startsWith("/") ? url : `/${url}`;

    if (cleanUrl === "/en" || cleanUrl === "/vi") {
      return cleanUrl;
    }

    if (cleanUrl === `/${locale}` || cleanUrl.startsWith(`/${locale}/`)) {
      return cleanUrl;
    }

    return `/${locale}${cleanUrl}`;
  };
  const handleMenuClick = (id: string) => {
    setOpenSubMenu((prev) => (prev === id ? null : id));
  };

  return (
    <header className="w-full bg-white">
      <div className="hidden h-[90px] items-center px-[70px] lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-10">
          {menu.map((item) => {
            const isOpen = openSubMenu === item.id;

            return (
              <div key={item.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleMenuClick(item.id)}
                  className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[18px] font-medium text-[#232323]"
                >
                  <span>{item.label}</span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute left-0 top-full z-50 mt-5 w-[245px] rounded-xl bg-white py-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all ${
                    isOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={getMenuUrl(child.url)}
                      className="block whitespace-nowrap px-5 py-3 text-[18px] text-gray-800 hover:bg-gray-100"
                      onClick={() => setOpenSubMenu(null)}
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
          <Link href={`/${locale}/home`}>
            <img
              src={logo}
              alt="Logo Cypress"
              className="h-[70px] w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-5">
          <HeaderCountdown
            targetDate={header.countdown?.target_date}
            enabled={header.countdown?.enabled}
            faviconUrl={faviconUrl}
          />

          {cta && (
            <Link
              href={getMenuUrl(cta.href)}
              className="flex h-10 shrink-0 items-center whitespace-nowrap rounded-lg bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>

      <div className="flex h-[80px] items-center justify-between px-6 lg:hidden">
        <Link href={`/${locale}/home`}>
          <img
            src={logo}
            alt="Logo Cypress"
            className="h-[60px] w-auto object-contain"
          />
        </Link>

        <button
          type="button"
          onClick={() => setOpenMenu((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          openMenu ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <div className="bg-black text-white">
          {menu.map((item) => {
            const isOpen = openSubMenu === item.id;

            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => handleMenuClick(item.id)}
                  className="flex w-full items-center justify-between px-6 py-4"
                >
                  <span>{item.label}</span>

                  <ChevronDown
                    size={20}
                    className={`transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen &&
                  item.children?.map((child) => (
                    <Link
                      key={child.id}
                      href={getMenuUrl(child.url)}
                      className="block px-10 py-3 text-gray-300 hover:bg-gray-900"
                      onClick={() => {
                        setOpenSubMenu(null);
                        setOpenMenu(false);
                      }}
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
              faviconUrl={faviconUrl}
            />

            {cta && (
              <Link
                href={getMenuUrl(cta.href)}
                className="mt-4 block rounded bg-blue-600 py-3 text-white hover:bg-blue-700"
                onClick={() => setOpenMenu(false)}
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
