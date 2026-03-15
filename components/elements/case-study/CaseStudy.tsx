import CaseStudyCard from "@components/ui/case-study-card/CaseStudyCard";
import getCardsContent from "@/lib/get-cards-content/getCardsContent";
import Heading from "@/components/elements/heading/Heading";

const CaseStudy = async () => {
  const caseCards = await getCardsContent();

  return (
    <section id="case" className="relative m-auto flex h-min w-full [transform:perspective(1200px)] scroll-mt-5 flex-col items-center justify-center gap-12 overflow-visible py-16 opacity-100 will-change-transform md:w-4/5">
      <Heading className="text-[#FDFEFF] self-start">Cases</Heading>
      {(caseCards || []).map((props) => (
        <CaseStudyCard
          description={props.description}
          source={props.file}
          title={props.title}
          slug={props.slug}
          key={props.slug}
        />
      ))}
    </section>
  );
};

export default CaseStudy;
