"use client";

import { useFooter } from "@/src/modules/footer/hooks/useFooter";
import { useHeader } from "@/src/modules/header";
import FooterBrand from "./FooterBrand";
import FooterNavigation from "./FooterNavigation";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  const { footer, loading: footerLoading, error: footerError } = useFooter();

  const { header, loading: headerLoading, error: headerError } = useHeader();
  if (footerLoading || headerLoading) {
    return (
      <footer className="w-full bg-[#030b16] text-white">
        <div className="mx-[70px] py-10">Loading...</div>
      </footer>
    );
  }

  if (footerError || headerError || !footer || !header) {
    return null;
  }

  const logo = header.logoData?.logo || "/images/logo_cypress.png";

  const navigations = footer.footerNavigation?.navigations ?? [];

  const companyLinks = navigations
    .filter((item) => item.group === "Company")
    .map((item) => ({
      label: item.title,
      href: item.link,
    }));

  const contactLinks = navigations
    .filter((item) => item.group === "Contact Us")
    .map((item) => ({
      label: item.title,
      href: item.link,
    }));

  return (
    <footer className="w-full bg-[#030b16] text-white">
      <div className="mx-[70px] py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-12">
          <FooterBrand
            branding={footer.footerBranding}
            logo={logo}
            socials={footer.footerSocials}
          />

          <FooterNavigation title="Company" links={companyLinks} />

          <FooterNavigation title="Contact Us" links={contactLinks} />

          <FooterNewsletter newsletter={footer.footerNewsletter} />
        </div>

        <div className="my-8 h-px w-full bg-white/15" />

        <div className="flex flex-col gap-4 text-sm text-white/90 md:flex-row md:items-center md:justify-between">
          <p>{footer.footerBottomBar?.copyright}</p>

          <div className="flex gap-5">
            {footer.footerBottomBar?.legal_links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="transition-colors hover:text-white"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
