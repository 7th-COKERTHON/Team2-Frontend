"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import { postHabit } from "@/app/api/habit";

import CloseIcon from "@/assets/close.svg";

import { CommonModal } from "@/components/common/CommonModal";
import { FullButton } from "@/components/common/FullButton";

import { HabitCreate } from "@/types/habit";

const HabitAdd = () => {
  const router = useRouter();
  const [momentText, setMomentText] = useState(""); // 오늘 나의 찔릿한 순간
  const [habitText, setHabitText] = useState(""); // 나의 다짐
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMoment, setAlertMoment] = useState(false);
  const [alertHabit, setAlertHabit] = useState(false);

  const handleClickClose = () => {
    if (momentText.length > 0 || habitText.length > 0) {
      setModalOpen(true);
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async () => {
    const isMomentInvalid = momentText.length < 10;
    const isHabitInvalid = habitText.length < 10;

    setAlertMoment(isMomentInvalid);
    setAlertHabit(isHabitInvalid);

    if (isMomentInvalid || isHabitInvalid) return;

    setLoading(true);

    try {
      await postHabit({
        badBehavior: momentText,
        resolution: habitText,
      } as HabitCreate);

      router.back(); // 등록 후 뒤로가기
    } catch (error) {
      console.error("Habit 등록 실패:", error);
    }
  };

  return (
    <main className="relative w-full">
      <button
        onClick={handleClickClose}
        className="absolute top-18 right-5 cursor-pointer"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      <section className="absolute top-[70px] left-5 flex flex-col">
        <h2 className="text-h2 text-gray-100">고쳐야할 나쁜 습관을</h2>
        <h2 className="text-h2 text-gray-100">등록해 보세요</h2>
      </section>

      <section className="mt-[152px] flex flex-col gap-[17px] px-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-h3 text-gray-100">오늘 나의 찔릿한 순간</h3>
              <p className="text-b3 text-gray-70">
                무심코 한 잘못된 행동을 돌아보세요
              </p>
            </div>
            <div className="w-full rounded-[12px] border border-gray-50 p-5">
              <textarea
                value={momentText}
                onChange={e => setMomentText(e.target.value)}
                className="text-b4 h-[158px] w-full resize-none text-gray-100 placeholder-gray-50 outline-none"
                placeholder="예: 엄마가 빨래를 부탁했는데 짜증 내며 거절했다"
              />
            </div>
          </div>
          {alertMoment && (
            <p className="text-lab text-pink-100">10자 이상 작성해주세요.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-[5px]">
              <h3 className="text-h3 text-gray-100">나의 다짐</h3>
              <p className="text-b3 text-gray-70">
                찔릿했던 나를 위한 다짐을 추가해보세요
              </p>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex h-[57px] w-full items-center rounded-[12px] border border-gray-50 p-5">
                <textarea
                  value={habitText}
                  onChange={e => setHabitText(e.target.value)}
                  className="text-b4 h-[17px] w-full resize-none text-gray-100 placeholder-gray-50 outline-none"
                  placeholder="예: 엄마한테 화내기 전 3초 호흡 가다듬기"
                />
              </div>
            </div>
          </div>
          {alertHabit && (
            <p className="text-lab text-pink-100">10자 이상 작성해주세요.</p>
          )}
        </div>
      </section>

      <div className="fixed bottom-[30px] w-full max-w-[390px] px-5">
        <FullButton
          title={loading ? "등록중..." : "등록하기"}
          onClick={handleSubmit}
        />
      </div>

      {modalOpen && (
        <CommonModal
          title="나가시겠습니까?"
          content={[
            "다짐을 등록하지 않고 나가면,",
            "작성한 내용은 등록되지 않습니다.",
          ]}
          buttons={[
            { label: "아니오", onClick: () => setModalOpen(false) },
            { label: "삭제", onClick: () => router.back() },
          ]}
        />
      )}
    </main>
  );
};

export default HabitAdd;
