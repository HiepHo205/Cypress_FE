export interface CaseStudyImage {
  url: string;
  public_id: string;
}

export interface CaseStudyBanner {
  breadcrumb_first: string;
  breadcrumb_first_url: string;
  breadcrumb_second: string;
  breadcrumb_second_url: string;
  title: string;
  description: string;
  background_image: CaseStudyImage | null;
}

export interface CaseStudyCategoryChild {
  id: string;
  name: string;
}

export interface CaseStudyCategory {
  id: string;
  title: string;
  children: CaseStudyCategoryChild[];
}

export interface CaseStudyTableOfContentsChild {
  id?: string;
  order?: number;
  title?: string;
  label?: string;
  heading?: string;
}

export interface CaseStudyTableOfContentsItem {
  id?: string;
  order?: number;
  title?: string;
  label?: string;
  heading?: string;
  children?: Array<string | CaseStudyTableOfContentsChild>;
  subItems?: Array<string | CaseStudyTableOfContentsChild>;
  subsections?: Array<string | CaseStudyTableOfContentsChild>;
  items?: Array<string | CaseStudyTableOfContentsChild>;
  [key: string]: unknown;
}

export interface CaseStudySection {
  id?: string;
  type?: string;
  order?: number;
  title?: string;
  label?: string;
  heading?: string;
  content?: string;
  description?: string;
  image?: CaseStudyImage | string | null;
  [key: string]: unknown;
}

export interface CaseStudySocialMedia {
  name: string;
  icon?: CaseStudyImage | string | null;
  url: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  description: string;
  categories: string[];
  active: boolean;
  date: string | null;
  author: string | null;
  seriesTags: string[];
  tableOfContents: CaseStudyTableOfContentsItem[] | string | null;
  sections: CaseStudySection[] | string | null;
  social_media: CaseStudySocialMedia[] | string | null;
  image: CaseStudyImage | null;
  logo: CaseStudyImage | null;
}

export interface CaseStudyBannerProps {
  banner: CaseStudyBanner | null;
}

export interface CaseStudyPage {
  banner: CaseStudyBanner | null;
  categories: CaseStudyCategory[];
  caseStudyDetail: CaseStudyItem | null;
  caseStudies: CaseStudyItem[];
}

export interface CaseStudySidebarProps {
  categories: CaseStudyCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export interface CaseStudyGridProps {
  items: CaseStudyItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CaseStudyDetailProps {
  id: string;
}

export interface RelatedArticlesProps {
  currentId?: string | number;
}

export interface CaseStudyGridComponentProps extends CaseStudyGridProps {
  search: string;
  onSearchChange: (value: string) => void;
  totalResults: number;
  loading?: boolean;
}
