import { NewsDetail } from "@/src/modules/news";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, id } = await params;

  return <NewsDetail id={id} />;
}
