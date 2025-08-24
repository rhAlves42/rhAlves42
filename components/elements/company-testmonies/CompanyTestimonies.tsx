import tailwindMerge from "@utils/tailwindMerge";
import Circles from "../circles/Circles";
import Paragraph from "../paragraph/Paragraph";
const companyTestimony = [
  { logo: "/assets/companies/logo-act.svg", text: "Develiver impactful solutions" },
  {
    logo: "/assets/companies/miratech.jpeg",
    text: "Leverages the development quality!",
    circle: true
  },
  { logo: "/assets/companies/ene.svg", text: "He consistently exceeds our expectations" }
];
const CompanyTestimonies = () => {
  return (
    <section className="relative flex h-min flex-col flex-nowrap items-center justify-center gap-[40px] overflow-visible px-6 py-20">
      <Circles />
      <div className="flex flex-col gap-2 md:flex-row">
        {companyTestimony.map((testimony) => (
          <div
            key={testimony.logo}
            className="relative flex h-min w-full max-w-[800px] flex-1 flex-col flex-nowrap items-center justify-center gap-6 overflow-hidden p-0"
          >
            <div className="relative flex h-[80px] w-full flex-none flex-row flex-nowrap items-center justify-center gap-2.5 overflow-visible p-0">
              <img
                className={tailwindMerge(
                  "rounded-inherit block h-full w-full object-contain object-center",
                  { ["!rounded-full"]: testimony.circle }
                )}
                decoding="async"
                key={testimony.logo}
                src={testimony.logo}
                alt={`Company testimony: ${testimony.text}`}
              />
            </div>
            <div className="relative flex w-full flex-shrink-0 flex-col justify-start break-words whitespace-pre-wrap opacity-100">
              <Paragraph>{testimony.text}</Paragraph>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default CompanyTestimonies;
