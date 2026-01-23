import { useRouter } from "next/navigation";

import { BasicIcon } from "./BasicIcon";

export const EmptyBg = () => {
  const router = useRouter();
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <BasicIcon />
      <div className="mt-[16.32px] mb-[10px] flex flex-col">
        <h1 className="text-b3 text-gray-70">
          찔릿했던 순간, 후회한 적 있나요?
        </h1>
        <h1 className="text-b3 text-gray-70">
          지금 기록하고 다짐으로 이어가보세요
        </h1>
      </div>
      <button
        className="bg-pink-10 cursor-pointer rounded-[12px] px-4 py-[10px]"
        onClick={() => router.push("habit/add")}
      >
        <p className="text-gray-70 text-b4">찔릿했던 순간 기록하기</p>
      </button>
    </section>
  );
};
