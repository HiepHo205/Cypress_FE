interface FooterNavigationLink {
  label: string;
  href: string;
}

interface FooterNavigationProps {
  title: string;
  links: FooterNavigationLink[];
}

export default function FooterNavigation({
  title,
  links,
}: FooterNavigationProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <ul className="mt-5 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
