import getPageContent from "lib/get-page-content/getPageContent";
import ArticleBody from "../components/article-body/ArticleBody";
import ArticleHeader from "../components/article-header/ArticleHeader";
import StackContainer from "../components/stack-container/StackContainer";

const article = {
  title: "Portfolio Website for Construction Company",
  description:
    "Developed a portfolio website for a construction company, briefly acting as team lead to manage stakeholder communication and implement complex visual layouts.",
  imageSrcSet:
    "/assets/cases/portifolio-web-site/512w.png 512w, /assets/cases/portifolio-web-site/1024w.png 1024w, /assets/cases/portifolio-web-site/2048w.png 2048w, /assets/cases/portifolio-web-site/4096w.png 4096w, /assets/cases/portifolio-web-site/4243w.png 4243w",
  imageAlt: "Portfolio Website for Construction Company"
};
const stackItems = [
  { name: "Gatsby.js", logo: "/assets/stack/gatsby.png" },
  { name: "TypeScript", logo: "/assets/stack/typescript.svg" },
  { name: "Python", logo: "/assets/stack/python.png" },
  { name: "React Native", logo: "/assets/stack/react-native.png" },
  { name: "TailwindCSS", logo: "/assets/stack/tailwindcss.svg" }
];

type PageProps = {
  params: {
    slug: string;
  };
};

const Page: React.FC<PageProps> = async ({ params: { slug } }) => {
  const { markdown, properties } = await getPageContent(slug);

  return (
    <>
      <ArticleHeader
        description={properties.description}
        title={properties.title}
        imageSrcSet={article.imageSrcSet}
        imageAlt={article.imageAlt}
      />

      <ArticleBody content={markdown} />
      <StackContainer items={stackItems} />
    </>
  );
};
export default Page;
