import React, { type PropsWithChildren } from "react";

const CustomParagraph = ({ children }: PropsWithChildren) => (
  <p
    className="!text-left !text-[12px] !leading-[1.2em] !font-medium !tracking-[-0.2px] !text-[#b3c2cb]"
    data-styles-preset="QCtzoRG1E"
  >
    {children}
  </p>
);

const LinksContainer = ({ children }: PropsWithChildren) => (
  <div className="relative flex h-min w-min flex-row flex-nowrap content-start items-start justify-start gap-8 p-0 opacity-100">
    <div className="flex flex-shrink-0 flex-col justify-start opacity-100 outline-none">
      {children}
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="relative flex h-min w-full flex-row flex-nowrap items-center justify-between self-end-safe overflow-visible pt-10 pb-10 opacity-100">
      <div className="relative flex h-auto w-auto shrink-0 flex-col justify-start whitespace-pre opacity-100 outline-none">
        <CustomParagraph>
          <a
            className="framer-text framer-styles-preset-1wicq5s"
            data-styles-preset="ro7OPezbn"
            href="/"
            target="_blank"
            rel="noopener"
          >
            © Ricardo Alves 2025
          </a>
        </CustomParagraph>
      </div>
      <div className="relative flex h-min w-min flex-row flex-nowrap content-start items-start justify-start gap-8 p-0 opacity-100">
        <LinksContainer>
          <CustomParagraph>
            <a
              className="framer-text framer-styles-preset-1wicq5s"
              data-styles-preset="ro7OPezbn"
              href="https://www.linkedin.com/in/ricardohenri/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
          </CustomParagraph>
        </LinksContainer>
        <LinksContainer>
          <CustomParagraph>
            <a
              className="framer-text framer-styles-preset-1wicq5s"
              data-styles-preset="ro7OPezbn"
              href="mailto:ricardo_henriqui@outlook.com"
              target="_blank"
              rel="noopener"
            >
              Mail
            </a>
          </CustomParagraph>
        </LinksContainer>
        <LinksContainer>
          <CustomParagraph>
            <a
              className="framer-text framer-styles-preset-1wicq5s"
              data-styles-preset="ro7OPezbn"
              href="https://bio.theaveragedev.com"
              target="_blank"
              rel="noopener"
            >
              Website
            </a>
          </CustomParagraph>
        </LinksContainer>
        <LinksContainer>
          <CustomParagraph>
            <a
              className="framer-text framer-styles-preset-1wicq5s"
              data-styles-preset="ro7OPezbn"
              href="https://github.com/rhAlves42"
              target="_blank"
              rel="noopener"
            >
              Github
            </a>
          </CustomParagraph>
        </LinksContainer>
      </div>
    </footer>
  );
};
export default Footer;
