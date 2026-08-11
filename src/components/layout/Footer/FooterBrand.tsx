import Image from "next/image";
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
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3">
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
      </div>

      <p className="mt-5 max-w-[300px] text-sm leading-6 text-white/80">
        {branding.description}
      </p>

      <FooterSocialLinks socials={socials} />
    </div>
  );
}
