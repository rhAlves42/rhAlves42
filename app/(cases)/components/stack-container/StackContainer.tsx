import Heading from "@components/elements/heading/Heading";
import StackItem from "./stack-item/StackItem";
import { TStackItem } from "./types";

type StackContainerProps = {
  items: TStackItem[];
};

const StackContainer: React.FC<StackContainerProps> = ({ items }) => {
  return (
    <section className="flex flex-col gap-6 px-5 py-12 md:px-10">
      <Heading className="text-3xl text-[#d1dae0] md:text-4xl">Stack</Heading>
      <div className="flex w-full flex-wrap justify-center gap-8 rounded-xl bg-[#252523] p-4 md:w-max">
        {items.map((item) => (
          <StackItem key={item.name} name={item.name} logo={item.logo} />
        ))}
      </div>
    </section>
  );
};

export default StackContainer;
