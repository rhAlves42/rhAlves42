const BubbleBackground = () => {
  return (
    <div className="fixed top-2/5 left-1/2 h-[480px] w-3/4 flex-none -translate-x-1/2 -translate-y-1/2 overflow-visible blur-[80px]">
      <div className="absolute top-0 left-0 h-full w-full flex-none">
        <div className="relative h-full w-full translate-z-0 overflow-hidden rounded-none bg-[rgb(20,20,20)]">
          <div className="bubble pointer-events-none absolute h-full w-full bg-[rgba(0,20,0,1)]" />
        </div>
      </div>
    </div>
  );
};

export default BubbleBackground;
