interface OnboardingIndicatorProps {
  total: number;
  current: number;
}

export const OnboardingIndicator = ({
  total,
  current,
}: OnboardingIndicatorProps) => {
  return (
    <div className="absolute inset-x-0 bottom-[100px] z-[90] flex w-full justify-center">
      <div className="flex gap-[9px]">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          return (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-gray-70" : "bg-gray-30"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
