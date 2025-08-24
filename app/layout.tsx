import "css/tailwind.css";
import "css/main.css";

import type { WithChildren } from "types";

import React, { type PropsWithChildren } from "react";
import Navbar from "@components/containers/navbar/Navbar";
import navLogo from "@public/assets/bojack.png";

interface Props extends PropsWithChildren {
  condition: boolean;
}
const RenderIf = ({ condition, children }: Props) => (condition ? children : <></>);

export default function Root({ children }: WithChildren) {
  return (
    <html lang="en">
      <body>
        <RenderIf condition={false}>
          <Navbar logoSrc={navLogo.src} />
        </RenderIf>
        <div className="moving-gradient relative contents flex h-min min-h-screen w-[1200px] w-auto flex-col flex-nowrap justify-start gap-0 overflow-hidden bg-black p-0">
          <div className="fixed top-[calc(50.00000000000002%-480px/2)] left-[calc(50.00000000000002%-84.66666666666667%/2)] h-[480px] w-[85%] flex-none overflow-visible blur-[80px]" />
          <div className="fixed top-0 left-[calc(50.00000000000002%-100%/2)] h-screen w-full flex-none">
            <div className="noise h-full w-full rounded-none bg-[128px] bg-repeat opacity-[0.075]" />
          </div>
          <div className="z-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
