import Image from "next/image";
import type { FooterSocial } from "@/src/modules/footer/types/footer.type";

interface FooterSocialLinksProps {
  socials: FooterSocial[];
}

export default function FooterSocialLinks({ socials }: FooterSocialLinksProps) {
  return (
    <div className="mt-6 flex items-center gap-2">
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/70 text-xs font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-[#030b16]"
        >
          {social.icon && (
            <Image
              src={social.icon}
              alt={social.name}
              width={18}
              height={18}
              className="h-4 w-4 object-contain"
            />
          )}
        </a>
      ))}
    </div>
  );
}
