import { TStackItem } from "../types";

type StackItemProps = TStackItem & {};

const StackItem: React.FC<StackItemProps> = ({ name, logo }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src={logo}
        alt={`${name} logo`}
        className="h-[28px] w-[28px] rounded-full object-contain md:h-[32px] md:w-[32px] md:rounded-none"
      />
      <span className="ml-2 text-sm text-white">{name}</span>
    </div>
  );
};

export default StackItem;
