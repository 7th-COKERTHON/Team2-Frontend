import { useState } from "react";

import { deleteHabit } from "@/app/api/habit";

import { CommonModal } from "../common/CommonModal";

interface HabitMenuModalProps {
  onClose: () => void;
}
export const HabitMenuModal = ({ onClose }: HabitMenuModalProps) => {
  const [deleteClick, setDeleteClick] = useState(false);
  const onDelete = async (habitId: number) => {
    try {
      await deleteHabit(habitId);
      console.log("삭제 성공!");
      // await getHabit();
    } catch (error) {
      console.log("삭제 실패");
    }
  };
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
      {deleteClick && (
        <CommonModal
          title="다짐을 삭제할까요?"
          content={["다짐을 삭제하면", "삭제한 내용을 되돌릴 수 없습니다."]}
          buttons={[
            { label: "취소", onClick: () => console.log("취소") },
            { label: "삭제", onClick: () => console.log("삭제") },
          ]}
        />
      )}
    </div>
  );
};
