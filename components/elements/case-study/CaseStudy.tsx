import CaseStudyCard from "@components/ui/case-study-card/CaseStudyCard";
import getCardsContent from "@/lib/get-cards-content/getCardsContent";

const CaseStudy = async () => {
  const caseCards = await getCardsContent();

  return (
    <section className="relative m-auto flex h-min w-full max-w-[1000px] [transform:perspective(1200px)] scroll-mt-[20px] flex-col items-center justify-center gap-[48px] overflow-visible py-[64px] opacity-100 will-change-transform">
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
