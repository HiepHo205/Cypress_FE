export interface HeaderChild {
  id: string;
  label: string | null;
  href: string | null;
}

export interface HeaderMenu {
  id: string;
  label: string | null;
  children: HeaderChild[];
}

export interface HeaderCTA {
  label: string | null;
  href: string | null;
}

export interface Countdown {
  target_date: string;
  enabled: boolean;
}

export interface HeaderData {
  logo: string | null;
  menus: HeaderMenu[];
  cta: HeaderCTA | null;
  countdown: Countdown | null;
}
