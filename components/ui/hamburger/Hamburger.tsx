import { useState } from "react";
import tailwindMerge from "@utils/tailwindMerge";

const Hamburger = () => {
  const [state, setState] = useState<"hamburger" | "x">("hamburger");
  const shared =
    "bg-white will-change-transform origin-[50%_50%_0px] rounded-[10px] h-[2px] w-[20px] absolute";

  const cls = {
    hamburger: {
      top: "top-[calc(63.636363636363654%_-_2px_/_2)]",
      middle: "top-[21px]",
      bottom: "top-[calc(36.36363636363639%_-_2px_/_2)]"
    },
    x: {
      top: "-rotate-45 top-[calc(50.00000000000002%_-_2px_/_2)]",
      middle: "rotate-45",
      bottom: "top-[calc(50.00000000000002%_-_2px_/_2)] rotate-45"
    }
  }[state];

  const onClick = () => {
    console.log("state", state);
    setState((prev) => (prev === "x" ? "hamburger" : "x"));
  };

  return (
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <div
        className="cursor-pointer h-11 overflow-hidden relative w-11"
        data-highlight="true"
        tabIndex={0}
      >
        <div className={tailwindMerge(shared, cls.top)} />
        <div className={tailwindMerge(shared, cls.middle)} />
        <div className={tailwindMerge(shared, cls.bottom)} />
      </div>
    </button>
  );
};

export default Hamburger;
