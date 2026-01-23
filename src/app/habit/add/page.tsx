"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";

import CloseIcon from "@/assets/close.svg";

import { CommonModal } from "@/components/common/CommonModal";
import { FullButton } from "@/components/common/FullButton";

const HabitAdd = () => {
  const router = useRouter();
  const [momentText, setMomentText] = useState(""); // 오늘 나의 찔릿한 순간
  const [habitText, setHabitText] = useState(""); // 나의 다짐
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickClose = () => {
    if (momentText.length > 0 || habitText.length > 0) {
      setModalOpen(true);
    }
  };

  const handleSubmit = () => {
    // TODO: 여기서 POST API 호출
    console.log("오늘 나의 찔릿한 순간:", momentText);
    console.log("나의 다짐:", habitText);

    router.back();
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
      <section className="mt-[152px] flex flex-col gap-5 px-5">
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[5px]">
            <h3 className="text-h3 text-gray-100">나의 다짐</h3>
            <p className="text-b3 text-gray-70">
              찔릿했던 나를 위한 다짐을 추가해보세요
            </p>
          </div>
          <div className="flex h-[57px] w-full items-center rounded-[12px] border border-gray-50 p-5">
            <textarea
              value={habitText}
              onChange={e => setHabitText(e.target.value)}
              className="text-b4 h-[17px] w-full resize-none text-gray-100 placeholder-gray-50 outline-none"
              placeholder="예: 엄마한테 화내기 전 3초 호흡 가다듬기"
            />
          </div>
        </div>
      </section>
      <div className="fixed bottom-[30px] w-full max-w-[390px] px-5">
        {/*TODO: 클릭시 post api 호출 */}
        <FullButton title="등록하기" onClick={() => router.back()} />
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
