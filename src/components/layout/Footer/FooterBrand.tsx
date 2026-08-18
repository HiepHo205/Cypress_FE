"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import FooterSocialLinks from "./FooterSocialLinks";
import type {
  FooterBranding,
  FooterSocial,
} from "@/src/modules/footer/types/footer.type";

interface FooterBrandProps {
  branding: FooterBranding;
  logo: string | null;
  socials: FooterSocial[];
}

export default function FooterBrand({
  branding,
  logo,
  socials,
}: FooterBrandProps) {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "vi";

  return (
    <div className="flex flex-col">
      {/* Logo + Company name */}
      <Link
        href={`/${locale}/home`}
        className="flex w-fit items-center gap-3"
        aria-label={`${branding.company_name} Home`}
      >
        <div className="relative h-11 w-11">
          {logo && (
            <Image
              src={logo}
              alt={branding.company_name}
              fill
              className="object-contain"
            />
          )}
        </div>

        <span className="text-xl font-semibold tracking-tight">
          {branding.company_name}
        </span>
      </Link>

      <p className="mt-5 max-w-[300px] text-sm leading-6 text-white/80">
        {branding.description}
      </p>

      <FooterSocialLinks socials={socials} />
    </div>
  );
}
