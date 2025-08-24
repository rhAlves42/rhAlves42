import tailwindMerge from "@utils/tailwindMerge";
import { type PropsWithChildren } from "react";
import Paragraph from "../paragraph/Paragraph";

type BadgeProps = PropsWithChildren & {
  className?: string;
};
const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <div
    className={tailwindMerge(
      "relative flex h-min w-max flex-row flex-nowrap items-center justify-center gap-2 overflow-hidden rounded-lg border border-white/20 bg-[#0f151f] px-3 py-2",
      className
    )}
  >
    <Paragraph className="!text-[16px] !leading-[22.4px] !text-[#d1dae0]">{children}</Paragraph>
  </div>
);

export default Badge;
