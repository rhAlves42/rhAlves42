import { type PropsWithChildren } from "react";
import Navbar from "@components/containers/navbar/Navbar";
import navLogo from "@public/assets/bojack.png";
import Footer from "@components/containers/footer/Footer";

const CasesLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex h-max flex-col">
      <Navbar logoSrc={navLogo.src} />
      <div className="h-full flex-grow md:mx-auto md:mb-20">{children}</div>
      <div className="px-2">
        <Footer />
      </div>
    </main>
  );
};

export default CasesLayout;
