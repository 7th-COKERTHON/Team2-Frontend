"use client";

import { useMemo, useState } from "react";

import Dropdown from "@/assets/dropdown.svg";
import Kebabmenu from "@/assets/kebab menu.svg";
import Level1 from "@/assets/level1.svg";

import { NavigationBar } from "@/components/common/NavigationBar";

type TabType = "mine" | "saved";

interface UserInfo {
  name: string;
  level: number;
  expPercent: number;
}

interface Zzillit {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  type: TabType;
}

// ----------------------
// 레벨 칭호 유틸
// ----------------------
function getLevelTitle(level: number): string {
  if (level >= 10) return "전설의 찔릿 마스터";
  if (level >= 7) return "날카로운 심판자";
  if (level >= 4) return "집중하는 감시자";
  return "Lv.1 날카로운 찔릿";
}

const LevelBadgeSection = ({ user }: { user: UserInfo }) => {
  const title = useMemo(() => getLevelTitle(user.level), [user.level]);

  return (
    <section className="relative flex flex-col items-center pt-10 pb-8">
      <p className="relative mb-3 text-lg font-semibold text-gray-900">
        {user.name}님
      </p>

      <div className="relative flex h-[140px] w-[140px] items-center justify-center">
        <Level1 className="absolute top-0 left-0 z-10 h-[140px] w-[140px] text-pink-50" />
      </div>

      <p className="relative mt-4 text-base font-semibold text-gray-900">
        {title}
      </p>
    </section>
  );
};

const LevelProgressBar = ({ value }: { value: number }) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <section className="mt-2 flex w-full items-center gap-2 px-6">
      <div className="h-3 flex-1 rounded-full bg-pink-50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-400 to-blue-300 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-10 text-right text-sm font-medium text-blue-400">
        {clamped}%
      </span>
    </section>
  );
};

const TabSwitch = ({
  activeTab,
  onChange,
}: {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}) => {
  return (
    <section className="mt-6 px-6">
      <div className="bg-gray-10 flex gap-[10px] rounded-full p-2">
        <button
          type="button"
          onClick={() => onChange("mine")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            activeTab === "mine"
              ? "bg-pink-10 text-gray-100 shadow-xl"
              : "text-gray-70"
          }`}
        >
          나의 찔릿
        </button>
        <button
          type="button"
          onClick={() => onChange("saved")}
          className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
            activeTab === "saved"
              ? "bg-pink-10 text-gray-100 shadow-xl"
              : "text-gray-70"
          }`}
        >
          저장한 찔릿
        </button>
      </div>
    </section>
  );
};

// ----------------------
// 카드 + 메뉴 모달
// ----------------------
const ZzillitCard = ({
  item,
  isOpen,
  menuOpen,
  onToggleContent,
  onToggleMenu,
  onEdit,
  onDelete,
}: {
  item: Zzillit;
  isOpen: boolean;
  menuOpen: boolean;
  onToggleContent: () => void;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <article className="relative rounded-2xl bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-center justify-between gap-2">
        <button
          type="button"
          onClick={onToggleContent}
          className="w-full min-w-0 flex-1 text-left"
        >
          <p className="text-h3 text-gray-100">{item.title}</p>

          {!isOpen && (
            <p className="text-b4 text-gray-70 mt-1 block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {item.description}
            </p>
          )}
        </button>

        <div className="flex flex-col items-center gap-[15px]">
          <button type="button" onClick={onToggleMenu}>
            <Kebabmenu className="h-[15px] w-[15px] text-gray-700" />
          </button>
          <button type="button" onClick={onToggleContent}>
            <Dropdown
              className={`h-[7px] w-[10px] transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="text-b4 text-gray-70 mt-1 pt-3">
          <p className="whitespace-pre-line">{item.description}</p>
        </div>
      )}

      {menuOpen && (
        <MenuModal onClose={onToggleMenu} onEdit={onEdit} onDelete={onDelete} />
      )}
    </article>
  );
};

const MenuModal = ({
  onClose,
  onEdit,
  onDelete,
}: {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-100/50">
      <div className="w-[300px] rounded-[20px] bg-white p-4 shadow-lg">
        <button
          className="text-b4 w-full px-3 py-3 text-left text-gray-100"
          onClick={onDelete}
        >
          다짐 삭제하기
        </button>

        <button className="text-b4 w-full px-3 py-3 text-left" onClick={onEdit}>
          다짐 수정하기
        </button>

        <button
          className="bg-gray-30 text-b4 text-gray-70 mt-2 w-full rounded-xl py-3 text-center"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

const DeleteModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-gray-100/50">
      <div className="w-[320px] rounded-[20px] bg-white px-6 py-6 shadow-lg">
        <p className="text-h2 mb-[10px] text-center text-gray-100">
          다짐을 삭제할까요?
        </p>
        <p className="text-b4 text-gray-70 mt-3 text-center">
          다짐을 삭제하면
          <br />
          삭제한 내용을 되돌릴 수 없습니다.
        </p>

        <div className="mt-6 flex h-[48px] overflow-hidden rounded-xl">
          <button
            className="text-gray-70 bg-gray-30 text-b4 flex-1"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="text-b4 flex-1 bg-pink-400 text-gray-100"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------
// 메인 페이지
// ----------------------
export default function MyPage() {
  const user: UserInfo = {
    name: "김감자",
    level: 1,
    expPercent: 50,
  };

  const [activeTab, setActiveTab] = useState<TabType>("mine");
  const [openCardId, setOpenCardId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const zzillits: Zzillit[] = [
    // ========================
    // mine (6개)
    // ========================
    {
      id: 1,
      title: "사람 말 끝까지 듣기",
      description:
        "회의 중 다른 사람 의견을 끝까지 듣기. 반박하고 싶을 때도 말을 끊지 않고 최소 3초는 생각할 시간을 갖기.",
      createdAt: "2026.01.20",
      type: "mine",
    },
    {
      id: 2,
      title: "휴대폰 보면서 대답하지 않기",
      description:
        "대화 중 스마트폰을 내려놓고 눈을 보며 대답하기. 상대방에게 집중하는 태도 유지하기.",
      createdAt: "2026.01.18",
      type: "mine",
    },
    {
      id: 3,
      title: "자기 전에 SNS 한 시간 줄이기",
      description:
        "잠들기 전 SNS를 습관적으로 보는 시간을 줄이기 위해, 침대에 누우면 스마트폰을 책상에 두기.",
      createdAt: "2026.01.17",
      type: "mine",
    },
    {
      id: 4,
      title: "메모하고 의견 말하기",
      description:
        "회의 중 끼어들지 않고 먼저 메모만 하기. 회의가 끝난 뒤 정리해서 의견 전달하기.",
      createdAt: "2026.01.15",
      type: "mine",
    },
    {
      id: 5,
      title: "지각 줄이기",
      description:
        "약속 시간 10분 전 도착을 목표로 준비 단계 시간을 역산해서 계획하기.",
      createdAt: "2026.01.13",
      type: "mine",
    },
    {
      id: 7,
      title: "사람 말 끊지 않기",
      description:
        "다른 사람 말 중간에 끼어들지 않기 위해 메모만 하기. 회의가 끝난 뒤 의견 전달하기.",
      createdAt: "2026.01.14",
      type: "saved",
    },
    {
      id: 8,
      title: "카페에서 이어폰 끼기",
      description:
        "공공장소에서 영상이나 콘텐츠를 볼 때 이어폰 없이 보지 않도록 주의하기.",
      createdAt: "2026.01.12",
      type: "saved",
    },
    {
      id: 9,
      title: "감정 기록하기",
      description:
        "감정이 올라오면 즉시 반응하지 말고 5초 멈춘 후 감정을 기록하기.",
      createdAt: "2026.01.10",
      type: "saved",
    },
    {
      id: 10,
      title: "과식 방지하기",
      description:
        "밥 먹기 전에 물 한 잔 마시고 천천히 먹기. 배부름 신호는 20분 뒤에 온다는 사실 기억하기.",
      createdAt: "2026.01.09",
      type: "saved",
    },
    {
      id: 11,
      title: "칭찬 먼저 하기",
      description:
        "대화 시작 전에 상대의 장점이나 노력 포인트를 한 번 언급하기.",
      createdAt: "2026.01.08",
      type: "saved",
    },
  ];

  const filtered = zzillits.filter(z => z.type === activeTab);

  return (
    <main className="bg-gray-20 flex min-h-screen w-full justify-center">
      <div className="flex w-full max-w-[430px] flex-col pb-24">
        <LevelBadgeSection user={user} />
        <LevelProgressBar value={user.expPercent} />
        <TabSwitch activeTab={activeTab} onChange={setActiveTab} />

        <section className="mt-6 space-y-3 px-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-white py-10 text-center text-sm text-gray-500 shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
              사람들의 찔릿이 아직 없어요.
              <br />
              오늘 첫 기록을 남겨볼까요?
            </div>
          ) : (
            filtered.map(item => (
              <ZzillitCard
                key={item.id}
                item={item}
                isOpen={openCardId === item.id}
                menuOpen={openMenuId === item.id}
                onToggleContent={() => {
                  setOpenMenuId(null);
                  setOpenCardId(prev => (prev === item.id ? null : item.id));
                }}
                onToggleMenu={() => {
                  setOpenCardId(null);
                  setOpenMenuId(prev => (prev === item.id ? null : item.id));
                }}
                onEdit={() => console.log("edit")}
                onDelete={() => setDeleteTargetId(item.id)}
              />
            ))
          )}
        </section>
      </div>
      {/* 하단 네비 */}
      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[390px]">
        <NavigationBar />
      </nav>

      {/* 삭제 모달 */}
      <DeleteModal
        open={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          console.log("삭제 실행:", deleteTargetId);
          setDeleteTargetId(null);
        }}
      />
    </main>
  );
}
