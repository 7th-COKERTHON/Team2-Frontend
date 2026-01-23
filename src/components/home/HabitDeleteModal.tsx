interface HabitDeleteProps {
  onClose: () => void;
}
export const HabitDeleteModal = ({ onClose }: HabitDeleteProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50">
      <div className="bg-gray-10 flex flex-col items-center justify-center gap-5 rounded-[12px] px-5 pt-[30px] pb-5">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <h1 className="text-h2 text-gray-100">다짐을 삭제할까요?</h1>
          <div className="flex flex-col items-center justify-center">
            <p className="text-b4 text-gray-70">다짐을 삭제하면</p>
            <p className="text-b4 text-gray-70">
              삭제한 내용을 되돌릴 수 없습니다.
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-[10px]">
          <button className="bg-gray-30 text-gray-70 h-[38px] w-30 cursor-pointer rounded-[8px]">
            취소
          </button>
          <button
            className="h-[38px] w-30 cursor-pointer rounded-[8px] bg-pink-50 text-gray-100"
            onClick={onClose}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};
