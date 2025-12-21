import Paragraph from "@components/elements/paragraph/Paragraph";

type ArticleHeaderProps = {
  title: string;
  description: string;
  imageSrcSet: string;
  imageAlt: string;
};
const ArticleHeader = ({ title, description, imageSrcSet, imageAlt }: ArticleHeaderProps) => {
  return (
    <article className="relative flex h-auto w-full flex-none flex-col justify-start gap-8 py-10 break-words whitespace-pre-wrap outline-none md:w-full md:min-w-[300px]">
      <h1 className="px-10 text-4xl font-medium text-[#d1dae0] md:max-w-[800px] md:text-5xl">
        {title}
      </h1>
      <Paragraph className="px-10 text-start text-xl text-[#b3c2cb] md:max-w-[800px] md:text-2xl">
        {description}
      </Paragraph>

      <img
        srcSet={imageSrcSet}
        alt={imageAlt}
        sizes="calc(min(100vw - 80px, 1080px) - 80px)"
        className="mt-10 object-cover md:max-w-fit md:rounded-3xl lg:max-w-[920px]"
      />
    </article>
  );
};

export default ArticleHeader;
