"use client";

import { MouseEvent, TouchEvent, useRef, useState } from "react";

import Close from "@/assets/close.svg";
import Bg1 from "@/assets/onBoarding/bg1.svg";
import Bg2 from "@/assets/onBoarding/bg2.svg";
import Bg3 from "@/assets/onBoarding/bg3.svg";

import { FullButton } from "@/components/common/FullButton";
import { OnboardingIndicator } from "@/components/onboard/OnboardingIndicator";

export default function OnboardingBottomSheet() {
  const [isOpen, setIsOpen] = useState(true);
  const [presentStage, setPresentStage] = useState<1 | 2 | 3>(1);
  const TOTAL_STAGE = 3;

  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const handleClose = () => setIsOpen(false);

  const goNext = () => {
    if (presentStage === TOTAL_STAGE) return handleClose();
    setPresentStage((presentStage + 1) as 1 | 2 | 3);
  };

  const goPrev = () => {
    if (presentStage === 1) return;
    setPresentStage((presentStage - 1) as 1 | 2 | 3);
  };

  /** mobile swipe */
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    touchStartX.current = null;
  };

  /** desktop mouse drag */
  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging.current || touchStartX.current === null) return;
    const diff = touchStartX.current - e.clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    isDragging.current = false;
    touchStartX.current = null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 select-none">
      <div className="bg-gray-10 relative h-100 w-[390px] overflow-hidden rounded-t-[20px] shadow-xl">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-5 z-50 p-2"
        >
          <Close className="h-5 w-5" />
        </button>

        {/* Stage 화면 */}
        <div
          className="relative h-full w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {presentStage === 1 && (
            <div className="relative h-full w-full">
              <div className="absolute top-[69px] left-5 z-50 text-start">
                <p className="text-b1 leading-tight font-medium">
                  오늘 있었던 나의 잘못한 행동을
                </p>
                <p className="text-h2 leading-tight font-semibold">
                  차분히 돌아보고 기록해보세요
                </p>
              </div>
              <Bg1 className="absolute top-[69px] left-2 h-[235px] w-[345px]" />
            </div>
          )}

          {presentStage === 2 && (
            <div className="relative h-full w-full">
              <div className="absolute top-[69px] left-5 z-50 text-start">
                <p className="text-b1 font-medium">
                  다른 사람들의 기록을 보면서
                </p>
                <p className="text-h2 font-semibold">
                  내가 놓치고 있던 습관을 찾아보세요
                </p>
              </div>
              <Bg2 className="absolute top-[33px] left-5 h-[263px] w-[344px]" />
            </div>
          )}

          {presentStage === 3 && (
            <div className="relative h-full w-full">
              <div className="absolute top-[69px] left-5 z-50 text-start">
                <p className="text-b1 leading-tight font-medium">
                  내 잘못된 습관을 7일 동안 체크하며
                </p>
                <p className="text-h2 leading-tight font-semibold">
                  스스로 발견해보세요
                </p>
              </div>
              <Bg3 className="absolute top-[14px] right-[5px] h-[390px] w-[415px]" />
            </div>
          )}
        </div>

        {/* Indicator */}
        <OnboardingIndicator total={TOTAL_STAGE} current={presentStage - 1} />

        {/* CTA */}
        <div className="absolute bottom-[30px] w-full px-5">
          <FullButton
            title={presentStage === TOTAL_STAGE ? "시작하기" : "다음"}
            isActive
            onClick={goNext}
          />
        </div>
      </div>
    </div>
  );
}
