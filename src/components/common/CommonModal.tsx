interface CommonModalProps {
  title: string;
  content: string | string[];
  buttons: {
    label: string;
    onClick: () => void;
  }[]; // 버튼 디자인은 고정
}

export const CommonModal = ({ title, content, buttons }: CommonModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50">
      <div className="bg-gray-10 flex flex-col items-center justify-center gap-5 rounded-[12px] px-5 pt-[30px] pb-5">
        {/* 제목 */}
        <h1 className="text-h2 text-gray-100">{title}</h1>

        {/* 내용 */}
        <div className="flex flex-col items-center justify-center gap-1">
          {Array.isArray(content) ? (
            content.map((line, idx) => (
              <p key={idx} className="text-b4 text-gray-70">
                {line}
              </p>
            ))
          ) : (
            <p className="text-b4 text-gray-70">{content}</p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-[10px]">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`h-[38px] w-30 cursor-pointer rounded-[8px] ${
                idx === 0
                  ? "bg-gray-30 text-gray-70" // 첫 번째 버튼은 취소 스타일
                  : "bg-pink-50 text-gray-100" // 나머지는 삭제 스타일
              }`}
              onClick={btn.onClick}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
