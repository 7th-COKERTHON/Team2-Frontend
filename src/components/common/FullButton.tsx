interface FullButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const FullButton = ({
  title,
  isActive = true,
  onClick,
}: FullButtonProps) => {
  return (
    <button
      className={`h-15 w-full rounded-xl ${
        isActive ? "bg-gray-100" : "bg-gray-30"
      } flex items-center justify-center p-[10px]`}
      onClick={onClick}
    >
      <p className={`${isActive ? "text-gray-10" : "text-gray-50"} text-b3`}>
        {title}
      </p>
    </button>
  );
};
