import CaseStudyCard from "@components/ui/case-study-card/CaseStudyCard";
import getCardsContent from "@/lib/get-cards-content/getCardsContent";
import { Suspense } from "react";

const CaseStudyComp = async () => {
  const caseCards = await getCardsContent();

  console.info("GET /api/cards successful: " + caseCards.length);

  console.info("Rendering CaseStudy component");

  return (
    <section className="custom-class-debug relative m-auto flex h-min w-full max-w-[1000px] [transform:perspective(1200px)] scroll-mt-[20px] flex-col items-center justify-center gap-[48px] overflow-visible py-[64px] opacity-100 will-change-transform">
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
