import { type PropsWithChildren } from "react";

import tailwindMerge from "@utils/tailwindMerge";
type ParagrapthProps = PropsWithChildren & {
  className?: string;
};

const Paragraph = ({ children, className }: ParagrapthProps) => (
  <p className={tailwindMerge("text-center text-[20px] font-thin text-[#FDFEFF]", className)}>
    {children}
  </p>
);
export default Paragraph;
