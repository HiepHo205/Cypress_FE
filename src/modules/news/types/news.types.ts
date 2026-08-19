export interface CloudinaryImage {
  url: string;
  public_id?: string | null;
}

export interface NewsPostCategory {
  id: string;
  title: string;
  description?: string | null;
}

export interface NewsPageItem {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  date: string;
  author?: string | null;
  authorLogo?: CloudinaryImage | null;
  status?: string | null;
  featured: boolean;
  image?: CloudinaryImage | null;
  logo?: CloudinaryImage | null;
  social_media?: NewsSocialMedia[] | string;
  tableOfContents?: NewsTableOfContentsItem[] | string;
  sections?: NewsDetailSection[] | string;
}

export interface NewsDetailSection {
  id: string;
  order?: number;
  title?: string;
  heading?: string;
  description?: string;
  content?: string;
  image?: CloudinaryImage | null;
  [key: string]: unknown;
}

export interface NewsTableOfContentsChild {
  id?: string;
  title?: string;
  label?: string;
  heading?: string;
  [key: string]: unknown;
}

export interface NewsTableOfContentsItem {
  id?: string;
  order?: number;
  title?: string;
  label?: string;
  heading?: string;
  children?: NewsTableOfContentsChild[] | string;
  subItems?: NewsTableOfContentsChild[] | string;
  subsections?: NewsTableOfContentsChild[] | string;
  items?: NewsTableOfContentsChild[] | string;
  [key: string]: unknown;
}

export interface NewsSocialMedia {
  name: string;
  url: string;
  icon?: CloudinaryImage | null;
}

export interface NewsDetail extends NewsPageItem {
  author?: string | null;
  authorLogo?: CloudinaryImage | null;
  logo?: CloudinaryImage | null;
  social_media?: NewsSocialMedia[] | string;
  seriesTags?: string[] | string;
  tableOfContents?: NewsTableOfContentsItem[] | string;
  sections?: NewsDetailSection[] | string;
}

export interface NewsDetailProps {
  id: string;
}

export interface NewsBanner {
  breadcrumb_first?: string;
  breadcrumb_first_url?: string;
  breadcrumb_second?: string;
  breadcrumb_second_url?: string;
  title?: string;
  description?: string;
  background_image?: CloudinaryImage | null;
  [key: string]: unknown;
}

export interface NewsNewsletter {
  title1?: string;
  title2?: string;
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  buttonText?: string;
  buttonUrl?: string;
  [key: string]: unknown;
}

export interface NewsPage {
  banner: NewsBanner | null;
  newsletter: NewsNewsletter | null;
  postCategories: NewsPostCategory[];
  latest: NewsPageItem[];
  featured: NewsPageItem[];
  newsDetail?: NewsDetail | null;
}

export interface NewsPageResponse {
  newsPage: NewsPage;
}

export interface NewsFilterProps {
  categories: string[];
  selectedCategory: string;
  search: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (value: string) => void;
}

export interface RelatedNewsProps {
  currentId: string;
}
