import CaseStudyCard from "@components/ui/case-study-card/CaseStudyCard";

const cases = [
  {
    source: "/assets/cases/trek.webp",
    title: "Portfolio Website for Construction Company",
    description:
      "Developed a portfolio website for a construction company, briefly acting as team lead to manage stakeholder communication and implement complex visual layouts.",
    className: "bg-[rgb(186, 138, 214)]"
  },

  {
    source: "/assets/cases/stockpile.webp",
    title: "Migration from Swift iOS to React Native",
    description:
      "Led the migration of an iOS Swift app to React Native, streamlining requirements via Figma wireframes and implementing key features such as map integrations using React Native Maps.",
    className: "bg-[rgb(212,135,64)]"
  },
  {
    source: "/assets/cases/lia.webp",
    title: "Health App for Elderly Users",
    description:
      "Developed features for a Next.js + React app targeted at older users, improving onboarding by reducing friction and simplifying flows; also contributed to backend improvements with FastAPI.",
    className: "bg-[rgb(212,135,64)]"
  }
];
const CaseStudy = () => {
  return (
    <section className="relative m-auto flex h-min w-full max-w-[1000px] [transform:perspective(1200px)] scroll-mt-[20px] flex-col items-center justify-center gap-[48px] overflow-visible py-[64px] opacity-100 will-change-transform">
      {cases.map((props) => (
        <CaseStudyCard {...props} key={props.source} />
      ))}
    </section>
  );
};

export default CaseStudy;
