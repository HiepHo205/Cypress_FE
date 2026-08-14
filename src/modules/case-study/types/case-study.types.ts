export interface CaseStudyBanner {
  breadcrumb_first: string;
  breadcrumb_first_url: string;
  breadcrumb_second: string;
  breadcrumb_second_url: string;
  title: string;
  description: string;
  background_image: {
    url: string;
    public_id: string;
  } | null;
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

export interface CaseStudyPage {
  banner: CaseStudyBanner | null;
  categories: CaseStudyCategory[];
  caseStudies: CaseStudyItem[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  description: string;
  categories: string[];
  active: boolean;
  image: {
    url: string;
    public_id: string;
  } | null;
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
