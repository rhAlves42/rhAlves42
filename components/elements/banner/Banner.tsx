import NeonButton from "@components/ui/neon-button/NeonButton";
import profileImg from "@public/assets/profile.jpg";
import BubbleBackground from "../bubble-background/BubbleBackground";

const Banner = () => {
  return (
    <div className="flex w-full flex-col items-center gap-10 rounded-lg py-8 text-center shadow-sm sm:py-12">
      <BubbleBackground />
      <div className="relative z-1 flex flex-col items-center">
        <img
          className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg"
          src={profileImg.src}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Ricardo Alves</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">Software Developer</span>
      </div>
      <div className="relative m-auto flex h-auto w-full max-w-[500px] min-w-[300px] flex-none shrink-0 transform-[perspective(1200px)] flex-col justify-start whitespace-pre-wrap opacity-100 will-change-transform">
        <h1 className="text-[32px] md:text-[46px]">
          <span data-text-fill="true" className="gradient-text font-normal text-[#d1dae0]">
            Transforming Ideas into <br /> High-Performance Applications
          </span>
        </h1>
      </div>

      <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <NeonButton>
          <p className="z-2 inline-flex rounded-lg text-lg !font-semibold text-white focus:ring-4 focus:ring-blue-300 focus:outline-none">
            Know more
          </p>
        </NeonButton>
      </div>
    </div>
  );
};

export default Banner;
