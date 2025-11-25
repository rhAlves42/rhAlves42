import getPageContent from "lib/get-page-content/getPageContent";
import ArticleBody from "../components/article-body/ArticleBody";
import ArticleHeader from "../components/article-header/ArticleHeader";
import StackContainer from "../components/stack-container/StackContainer";
import { Suspense } from "react";

const article = {
  imageSrcSet:
    "/assets/cases/portifolio-web-site/512w.png 512w, /assets/cases/portifolio-web-site/1024w.png 1024w, /assets/cases/portifolio-web-site/2048w.png 2048w, /assets/cases/portifolio-web-site/4096w.png 4096w, /assets/cases/portifolio-web-site/4243w.png 4243w",
  imageAlt: "Portfolio Website for Construction Company"
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const PageContent = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { content, stack, ...properties } = await getPageContent(slug);
  const items = (stack || []).map((item) => ({
    id: item.id,
    name: item.name,
    logo: item.icon
  }));
  return (
    <>
      <ArticleHeader
        description={properties.description}
        title={properties.title}
        imageSrcSet={article.imageSrcSet}
        imageAlt={article.imageAlt}
      />
      <ArticleBody content={content} />
      <StackContainer items={items} />
    </>
  );
};

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent params={params} />
    </Suspense>
  );
}
