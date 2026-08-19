export interface CloudinaryImage {
  url: string | null;
  public_id: string | null;
}

export interface HeroData {
  title: string;
  description: string;
  image: CloudinaryImage | null;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;
}

export interface BusinessGrowthPackage {
  number: string;
  title: string;
  packageName: string;
  headline: string;
  description: string;
  color: string;
  active: boolean;
}

export interface BusinessGrowth {
  label: string;
  title: string;
  description: string;
  packages: BusinessGrowthPackage[];
}

export interface IntroData {
  image: CloudinaryImage | null;
  title: string;
  description: string;
  author: string;
  position: string;
  showQuoteIcon: boolean;
  showAuthor: boolean;
}

export interface WhyChooseBenefit {
  id: string;
  title: string;
  description: string;
  icon: CloudinaryImage | null;
  active: boolean;
}

export interface WhyChooseCypress {
  badge: string;
  title: string;
  description: string;
  benefits: WhyChooseBenefit[];
}

export interface CaseStudy {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  summary: string;
  company: string;
  planTitle: string;
  seriesTags: string;
  learnMoreText: string;
  learnMoreUrl: string;
  active: boolean;
  logo: CloudinaryImage | null;
  image: CloudinaryImage | null;
}

export interface CaseStudiesResponse {
  caseStudies: CaseStudy[];
}

export interface PricingBanner {
  title: string;
  description: string;
  button_text: string;
  button_link: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  categories: string[] | null;
  role: string;
  company: string;
  quote: string;
  avatar: CloudinaryImage | null;
}

export interface SuccessStoriesResponse {
  successStories: SuccessStory[];
}

export interface HomepageNews {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  active: boolean;
  image: CloudinaryImage | null;
}

export interface HomepageSideNews {
  id: string;
  description: string;
  image: CloudinaryImage | null;
}

export interface HomepageNewsSectionItem {
  id: string;
  title: string;
}

export interface HomepageNewsSection {
  id: string;
  key: string;
  title: string;
  buttonText: string;
  buttonUrl: string;
  items: HomepageNewsSectionItem[];
}

export interface NewsResponse {
  news: HomepageNews[];
  sideNews: HomepageSideNews[];
  sections: HomepageNewsSection[];
}

export interface HomepageLaunchOffer {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
  expiryDate: string;
  seats: number;
}

export interface HomepageContactOption {
  id: string;
  value: string;
}

export interface HomepageContactLabel {
  id: string;
  title: string;
  placeholder: string;
  type: "input" | "textarea" | "select";
  options: HomepageContactOption[];
}

export interface HomepageContact {
  id: string;
  title: string;
  description: string;
  image: CloudinaryImage | null;
  termsText: string;
  termsLabel: string;
  termsUrl: string;
  buttonText: string;
  buttonUrl: string;
  labels: HomepageContactLabel[];
}

export interface HomepageGeneralInformation {
  generalInformations: {
    id: string;
    badge: string;
    title: string;
    description: string;
  }[];
}

export interface HomepageNewsData {
  label: string;
  title: string;
  news: HomepageNews[];
}

export interface HomepageSideNewsData {
  sideNews: HomepageSideNews[];
}

export interface HomepageNewsSectionsData {
  sections: HomepageNewsSection[];
}

export interface HomepageData {
  banner: HeroData | null;
  businessGrowth: BusinessGrowth | null;
  introduction: IntroData | null;
  whyChooseCypress: WhyChooseCypress | null;
  caseStudies: CaseStudiesResponse | null;
  pricing: PricingBanner | null;
  successStories: SuccessStoriesResponse | null;
  generalInformation: HomepageGeneralInformation | null;
  news: HomepageNewsData | null;
  sideNews: HomepageSideNewsData | null;
  launchOffer: HomepageLaunchOffer | null;
  newsSections: HomepageNewsSectionsData | null;
  contact: HomepageContact | null;
}
