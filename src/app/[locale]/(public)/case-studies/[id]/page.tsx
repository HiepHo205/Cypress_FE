import CaseStudyDetail from "@/src/modules/case-study/components/CaseStudyDetail";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, id } = await params;

  return <CaseStudyDetail id={id} />;
}
