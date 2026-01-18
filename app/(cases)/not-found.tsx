import Navbar from "@components/containers/navbar/Navbar";
import navLogo from "@public/assets/bojack.png";
import Footer from "@components/containers/footer/Footer";

const CasesLayout = () => (
  <main className="flex h-max flex-col">
    <Navbar logoSrc={navLogo.src} />
    <div className="h-full flex-grow md:mx-auto md:mb-20">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404 Not Found</h1>
        <p className="text-lg">The page you are looking for does not exist.</p>
      </div>
    </div>
    <div className="px-2">
      <Footer />
    </div>
  </main>
);

export default CasesLayout;
