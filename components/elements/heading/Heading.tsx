import tailwindMerge from "@utils/tailwindMerge";
import React, { type PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren & {
  className?: string;
};

const Heading: React.FC<HeadingProps> = ({ children, className }) => (
  <h2 className={tailwindMerge("text-[38px] leading-[45.6px]", className)}>{children}</h2>
);

export default Heading;
