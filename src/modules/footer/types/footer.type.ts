export interface FooterBranding {
  company_name: string;
  description: string;
}

export interface FooterSocial {
  id: string;
  name: string;
  url: string;
  icon: string | null;
}

export interface FooterNavigationItem {
  id: string;
  group: string;
  title: string;
  link: string;
  type: string;
}

export interface FooterNavigation {
  id: string;
  navigations: FooterNavigationItem[];
}

export interface FooterNewsletter {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  button_icon: string | null;
}

export interface FooterLegalLink {
  text: string;
  url: string;
}

export interface FooterBottomBar {
  id: string;
  copyright: string;
  legal_links: FooterLegalLink[];
}

export interface Footer {
  logo: string | null;
  footerBranding: FooterBranding;
  footerSocials: FooterSocial[];
  footerNavigation: FooterNavigation;
  footerNewsletter: FooterNewsletter;
  footerBottomBar: FooterBottomBar;
}
