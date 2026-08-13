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
  featured: boolean;
  image?: CloudinaryImage | null;
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
