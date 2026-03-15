import CaseStudyCard from "@components/ui/case-study-card/CaseStudyCard";
import getCardsContent from "@/lib/get-cards-content/getCardsContent";
import Heading from "@/components/elements/heading/Heading";
import { Suspense } from "react";

const CaseStudyComp = async () => {
  const caseCards = await getCardsContent();

  console.info("GET /api/cards successful: " + caseCards.length);

  console.info("Rendering CaseStudy component");

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

const CaseStudy = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <CaseStudyComp />
  </Suspense>
);

export default CaseStudy;
