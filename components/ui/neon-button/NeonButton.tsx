import tailwindMerge from "@utils/tailwindMerge";
import Neon from "./Neon";

type NeonButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {};
const NeonButton: React.FC<NeonButtonProps> = ({ children, ...props }) => {
  const buttonClassName = tailwindMerge(
    "opacity-100 rounded-full content-center items-center cursor-pointer flex flex-col flex-nowrap gap-2.5 h-min justify-center overflow-visible relative no-underline w-max px-7 py-4",
    props.className
  );

  return (
    <button {...props} className={buttonClassName}>
      <div className="absolute z-2 w-full rounded-full bg-black px-7 py-4" />
      <Neon />
      {children}
    </button>
  );
};

export default NeonButton;
