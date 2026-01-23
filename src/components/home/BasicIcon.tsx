import Rectangle from "@/assets/level6.svg";

export const BasicIcon = () => {
  return (
    <div className="relative h-[181px] w-[181px]">
      {/* Rectangle 배경 */}
      <Rectangle className="h-full w-full" />

      {/* 점 3개 */}
      <div className="absolute top-[83.84px] right-[59.84px] flex gap-[10px]">
        <div className="bg-purple-10 h-[14px] w-[14px] rounded-full"></div>
        <div className="bg-purple-10 h-[14px] w-[14px] rounded-full"></div>
        <div className="bg-purple-10 h-[14px] w-[14px] rounded-full"></div>
      </div>
    </div>
  );
};
