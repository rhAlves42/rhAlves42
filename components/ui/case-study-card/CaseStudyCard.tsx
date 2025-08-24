import tailwindMerge from "@utils/tailwindMerge";

type CaseStudyCardProps = {
  source: string;
  title: React.ReactNode;
  description: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ source, description, title, className }) => {
  return (
    <div className="perspective relative z-1 flex flex-col items-center gap-2 overflow-hidden rounded-4xl border border-[#cccccc1a] bg-[#0f151f] shadow-sm md:h-[500px] md:min-h-[500px] md:flex-row md:gap-20 md:px-10 md:py-15 lg:justify-center">
      <div
        className={tailwindMerge(
          "bg-[rgb(186, 138, 214)] absolute z-0 aspect-square w-full flex-none overflow-hidden rounded-[1000px] opacity-15 blur-[100px] will-change-transform md:w-[591px]",
          className
        )}
      ></div>

      <div className="flex h-full shrink-0 grow-1 basis-[0px] flex-col justify-between gap-2 px-6 py-8 leading-normal md:w-1/2 md:p-0 lg:max-w-[500px]">
        <div className="flex flex-col gap-4">
          <h5 className="mb-2 text-2xl font-light tracking-tight text-white">{title}</h5>
          <p className="mb-3 text-base font-light text-[#b3c2cb]">{description}</p>
        </div>
        {false && (
          <button className="relative ms-2 w-fit rounded-4xl border-gray-600 bg-gray-800 px-4 py-2 text-sm font-extralight text-gray-400 text-white hover:bg-gray-700 hover:text-white focus:ring-gray-700">
            View case study
          </button>
        )}
      </div>

      <img
        className="h-96 w-full rounded-lg object-cover md:h-auto md:min-h-[300px] md:w-1/2 md:rounded-lg lg:max-w-[500px]"
        src={source}
        alt=""
      />
    </div>
  );
};
export default CaseStudyCard;
