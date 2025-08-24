import React, { type PropsWithChildren } from "react";
import { withFrameShine } from "@hoc/with-frame-shine/withFrameShine";
import tailwindMerge from "@utils/tailwindMerge";

type ShineHighlightProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

const TextWithShine = ({ children }: { children: React.ReactNode; className?: string }) => (
  <p className="shine !text-[20px] !leading-[1.7em] !text-[#edeef0]">{children}</p>
);

const Paragrapth = ({ children }: PropsWithChildren) => (
  <p className="font-sans !text-[20px] !leading-[1.7em] !text-[#adb1b8]">{children}</p>
);
const ShineHighlight: React.FC<ShineHighlightProps> = ({
  children,
  className,
  containerClassName
}) => (
  <div
    className={tailwindMerge(
      "relative h-auto w-auto flex-none origin-[50%_50%_0px]",
      containerClassName
    )}
  >
    <div className="relative flex h-min w-min origin-center flex-row flex-nowrap content-center items-center justify-center gap-[10px] overflow-hidden rounded-[277px] p-[6px_18px] opacity-100 shadow-[rgba(0,0,0,0.184)_0px_0.706592px_0.706592px_-0.625px,rgba(0,0,0,0.18)_0px_1.80656px_1.80656px_-1.25px,rgba(0,0,0,0.173)_0px_3.62176px_3.62176px_-1.875px,rgba(0,0,0,0.16)_0px_6.8656px_6.8656px_-2.5px,rgba(0,0,0,0.13)_0px_13.6468px_13.6468px_-3.125px,rgba(0,0,0,0.063)_0px_30px_30px_-3.75px]">
      <div className="absolute inset-0 flex-none overflow-hidden bg-[rgb(60,63,68)] opacity-100"></div>
      <div
        data-framer-name="Border-Shine"
        className={tailwindMerge(
          "absolute inset-0 flex-none origin-center overflow-hidden bg-[#5a6165ff] opacity-100",
          className
        )}
      ></div>
      <div
        className="absolute inset-[1px] flex-none origin-center overflow-hidden rounded-[427px] bg-black opacity-100 will-change-transform"
        data-framer-name="Fill"
      ></div>
      <div
        className="relative flex h-min w-min flex-none origin-center flex-col flex-nowrap content-center items-center justify-center gap-[10px] overflow-visible p-0 opacity-100"
        data-framer-name="Message"
      >
        <div
          className="absolute top-[51%] left-1/2 z-10 flex h-auto w-auto flex-none shrink-0 origin-center -translate-x-1/2 -translate-y-1/2 flex-col justify-start whitespace-pre opacity-100 outline-none select-none"
          data-framer-name="Text"
        >
          <Paragrapth>{children}</Paragrapth>
        </div>
        <div
          className="absolute top-[51%] left-1/2 z-[1] flex h-auto w-auto shrink-0 -translate-x-1/2 -translate-y-1/2 flex-col justify-start whitespace-pre opacity-100 blur-[3px] outline-none select-none"
          data-framer-name="Glow"
        >
          <TextWithShine className="font-satoshi text-[20px] leading-[1.7em] text-[#edeef0]">
            {children}
          </TextWithShine>
        </div>
        <div
          className="absolute top-[51%] left-1/2 z-[1] flex shrink-0 translate-x-[-50%] translate-y-[-50%] flex-col justify-start whitespace-pre opacity-100 blur-[6px] select-none"
          data-framer-name="Glow"
        >
          <TextWithShine className="font-satoshi text-[20px] leading-[1.7em] text-[#edeef0]">
            {children}
          </TextWithShine>
        </div>
        <div
          className="absolute top-[51%] left-1/2 z-[2] flex shrink-0 translate-x-[-50%] translate-y-[-50%] flex-col justify-start whitespace-pre opacity-100 select-none"
          data-framer-name="Shine"
        >
          <TextWithShine className="font-satoshi text-[20px] leading-[1.7em] text-[#edeef0]">
            {children}
          </TextWithShine>
        </div>
        <div
          className="relative flex shrink-0 flex-col justify-start whitespace-pre opacity-0 select-none"
          data-framer-name="HELPER"
        >
          <Paragrapth>{children}</Paragrapth>
        </div>
      </div>
    </div>
  </div>
);

export default withFrameShine<ShineHighlightProps>(ShineHighlight);
