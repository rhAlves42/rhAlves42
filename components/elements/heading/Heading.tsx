import { type PropsWithChildren } from "react";
const Heading = ({ children }: PropsWithChildren) => (
  <h2 className="text-[38px] leading-[45.6px]">{children}</h2>
);

export default Heading;
