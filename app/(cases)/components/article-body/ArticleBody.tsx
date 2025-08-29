import Heading from "@components/elements/heading/Heading";
import ReactMarkdown from "react-markdown";

const ArticleBody: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="px-10 py-5 text-start text-lg leading-7 text-[#b3c2cb] md:text-xl md:leading-8">
      <Heading className="text-3xl text-[#d1dae0] md:text-4xl">Process</Heading>
      <div className="flex flex-col gap-12 pt-5 md:max-w-[800px] md:gap-20">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};
export default ArticleBody;
