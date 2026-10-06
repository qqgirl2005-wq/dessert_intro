"use client";

import { useEffect, useRef, useState } from "react";
import { Pudding, Sparkle } from "./Illustrations";

const WIN_RATE = 0.1;
const STORAGE_KEY = "pudding-lottery";

type Result = { date: string; win: boolean; code?: string };
type Stage = "idle" | "drawing" | "done";

const today = () => new Date().toLocaleDateString("sv"); // YYYY-MM-DD

function makeCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = crypto.getRandomValues(new Uint32Array(6));
  return "PUD80-" + Array.from(rand, (n) => chars[n % chars.length]).join("");
}

function loadResult(): Result | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Result | null;
    return saved?.date === today() ? saved : null;
  } catch {
    return null;
  }
}

// 布丁抽獎：每天一次，10% 機率抽中手工布丁 8 折兌換券
export default function PuddingLottery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState<Result | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const open = () => {
    const saved = loadResult();
    setResult(saved);
    setStage(saved ? "done" : "idle");
    dialog.current?.showModal();
  };

  const draw = () => {
    setStage("drawing");
    const r = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    const next: Result = r < WIN_RATE ? { date: today(), win: true, code: makeCode() } : { date: today(), win: false };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    timer.current = setTimeout(() => {
      setResult(next);
      setStage("done");
    }, 1600);
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center gap-2 rounded-full bg-butter px-6 py-4 ring-2 ring-ink shadow-[3px_3px_0_var(--color-ink)] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--color-ink)]"
      >
        <Sparkle className="h-4 w-4 text-berry" />
        抽布丁優惠券
      </button>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[min(26rem,calc(100%-2rem))] rounded-[2rem] bg-cream p-0 text-ink ring-2 ring-ink shadow-[6px_6px_0_var(--color-ink)] backdrop:bg-ink/50"
      >
        <div className="relative px-7 pt-10 pb-8 text-center sm:px-9">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="關閉"
            className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full text-xl hover:bg-blush"
          >
            ×
          </button>

          <p className="font-display text-sm italic text-berry-dark">Lucky Pudding</p>
          <h2 className="mt-1 text-2xl sm:text-3xl">布丁幸運抽</h2>

          <Pudding
            className={`mx-auto mt-6 h-32 w-32 ${stage === "drawing" ? "animate-wobble" : stage === "idle" ? "animate-bob" : ""} ${
              stage === "done" && !result?.win ? "opacity-60 grayscale" : ""
            }`}
          />

          <div aria-live="polite" className="mt-6 min-h-[9rem]">
            {stage === "idle" && (
              <>
                <p className="leading-relaxed text-ink/75">
                  每天可以抽一次，有 <strong className="text-berry">10%</strong> 機會抽中
                  <br />
                  手工布丁 <strong className="text-berry">8 折</strong>兌換券！
                </p>
                <button
                  type="button"
                  onClick={draw}
                  className="mt-6 rounded-full bg-ink px-8 py-3 text-paper transition hover:bg-berry"
                >
                  搖一搖布丁 →
                </button>
              </>
            )}

            {stage === "drawing" && <p className="pt-6 text-lg text-ink/70">布丁搖啊搖……</p>}

            {stage === "done" && result?.win && (
              <div className="relative rounded-2xl bg-butter px-5 py-5">
                <span className="absolute top-1/2 -left-3 h-6 w-6 -translate-y-1/2 rounded-full bg-cream" aria-hidden />
                <span className="absolute top-1/2 -right-3 h-6 w-6 -translate-y-1/2 rounded-full bg-cream" aria-hidden />
                <p className="text-lg">🎉 恭喜中獎！</p>
                <p className="mt-1 text-sm text-ink/75">手工布丁 8 折兌換券</p>
                <div className="my-3 border-t-2 border-dashed border-ink/30" />
                <p className="font-display text-xl tracking-wider tabular-nums select-all">{result.code}</p>
                <p className="mt-2 text-xs text-ink/60">請截圖，於結帳時出示此畫面即可使用（限當日）</p>
              </div>
            )}

            {stage === "done" && result && !result.win && (
              <p className="pt-4 leading-relaxed text-ink/75">
                差一點點！這次沒有抽中。
                <br />
                明天再來搖一次布丁吧 🍮
              </p>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
