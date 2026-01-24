import { useState } from "react";

import { deleteHabit } from "@/app/api/habit";

import { CommonModal } from "../common/CommonModal";

interface HabitMenuModalProps {
  habitId: number; // 삭제할 habitId 전달
  onClose: () => void; // 모달 닫기
  onDeleted?: () => void; // 삭제 성공 후 호출 (리스트 갱신 등)
}

export const HabitMenuModal = ({
  habitId,
  onClose,
  onDeleted,
}: HabitMenuModalProps) => {
  const [deleteClick, setDeleteClick] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteHabit(habitId);
      onDeleted?.(); // 삭제 후 부모에서 갱신
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("삭제 실패", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-10 flex flex-col gap-[10px] rounded-[12px] px-[25px] py-[15px]">
      <button
        className="text-b4 cursor-pointer text-gray-100"
        onClick={() => setDeleteClick(true)}
      >
        다짐 삭제하기
      </button>

      {deleteClick && (
        <CommonModal
          title="다짐을 삭제할까요?"
          content={["다짐을 삭제하면", "삭제한 내용을 되돌릴 수 없습니다."]}
          buttons={[
            { label: "취소", onClick: () => setDeleteClick(false) },
            { label: "삭제", onClick: handleDelete },
          ]}
        />
      )}
    </div>
  );
};
