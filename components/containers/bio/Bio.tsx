import Paragraph from "@components/elements/paragraph/Paragraph";
import ShineHighlight from "@components/elements/shine-highlight/ShineHighlight";

const Bio = () => {
  return (
    <section className="relative z-1 m-auto flex w-full max-w-[1248px] flex-col flex-nowrap items-center justify-center gap-10 overflow-hidden py-10">
      <div className="relative flex h-min w-full max-w-[640px] flex-row flex-wrap content-center items-center justify-center gap-2 overflow-visible p-0 2xl:max-w-[920px]">
        <Paragraph>I&apos;m a Software Engineer and expert in</Paragraph>
        <ShineHighlight>Web & Mobile</ShineHighlight>
        <Paragraph className="w-full md:w-auto">with over</Paragraph>
        <ShineHighlight>7 years</ShineHighlight>
        <Paragraph>of industry experience.</Paragraph>
        <Paragraph>Expertise extends to</Paragraph>
        <ShineHighlight containerClassName="">React, Node.js, and TypeScript</ShineHighlight>
        <Paragraph>enabling me to build scalable, high-performance applications across</Paragraph>
        <ShineHighlight>web and mobile</ShineHighlight>
      </div>
    </section>
  );
};

export default Bio;
