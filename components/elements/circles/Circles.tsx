import tailwindMerge from "@utils/tailwindMerge";

const sharedCircleClasses =
  "after:shadow-[0_0_15px_rgba(255,255,255,0.5)] absolute aspect-[1/1]  border-2 flex-none rounded-full border-[rgba(255,255,255,0.5)] shadow-[0_0_15px_rgba(255,255,255,0.5)] after:pointer-events-none after:absolute after:inset-0 after:top-1/2 after:left-1/2 after:box-border after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[inherit] after:border-[2px] after:border-solid after:border-[rgba(255,255,255,0.5)]";

const circles = [
  "-top-[28px] -right-[28px] -left-[28px] h-[297px] opacity-100 after:size-2/5 after:opacity-80",
  "-top-[97px] -right-[97px] -left-[97px] h-[435px] opacity-9 opacity-85 after:size-1/2",
  "-top-[165px] -right-[165px] -left-[165px] h-[571px] opacity-70 after:size-13/20",
  "-top-[238px] -right-[238px] -left-[238px] h-[717px] opacity-55 after:size-7/10",
  "-right-[306px] -bottom-[306px] -left-[306px] h-[853px] opacity-40 after:size-3/4",
  "-top-[375px] -right-[375px] -left-[375px] h-[991px] opacity-25 after:size-4/5",
  "-top-[444px] -right-[444px] -left-[444px] h-[1129px] opacity-10 after:size-[82%]"
];
const Circles = () => (
  <div className="absolute top-[calc(50%-241px/2)] left-[calc(50%-241px/2)] h-[241px] w-[241px] flex-none overflow-visible">
    {circles.map((circle) => (
      <div key={circle} className={tailwindMerge(sharedCircleClasses, circle)} />
    ))}
  </div>
);

export default Circles;
