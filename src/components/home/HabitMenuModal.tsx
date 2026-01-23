import { useState } from "react";

import { HabitDeleteModal } from "./HabitDeleteModal";

interface HabitMenuModalProps {
  onClose: () => void;
}
export const HabitMenuModal = ({ onClose }: HabitMenuModalProps) => {
  const [deleteClick, setDeleteClick] = useState(false);
  return (
    <div className="bg-gray-10 flex flex-col gap-[10px] rounded-[12px] px-[25px] py-[15px]">
      <button
        className="text-b4 cursor-pointer text-gray-100"
        onClick={() => {
          setDeleteClick(true);
        }}
      >
        다짐 삭제하기
      </button>
      <button className="text-b4 cursor-pointer text-gray-100">
        다짐 수정하기
      </button>
      {deleteClick && <HabitDeleteModal onClose={onClose} />}
    </div>
  );
};
