"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Sparkle } from "./Illustrations";

const STORAGE_KEY = "guest-name";

// 稱呼存在 localStorage；無法使用時（無痕模式等）退回記憶體，至少本次瀏覽有效
let memoryName: string | null = null;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function readName() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? memoryName;
  } catch {
    return memoryName;
  }
}

function saveName(name: string) {
  memoryName = name;
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {}
  listeners.forEach((cb) => cb());
}

// undefined = 伺服器端 / 尚未讀取；null = 還沒留下稱呼
export function useGuestName() {
  return useSyncExternalStore(subscribe, readName, () => undefined);
}

// 進站時詢問訪客稱呼，並在主視覺上方顯示歡迎語
export default function WelcomeGuest() {
  const dialog = useRef<HTMLDialogElement>(null);
  const name = useGuestName();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (name === null && !dismissed) dialog.current?.showModal();
  }, [name, dismissed]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (!value) return;
    saveName(value);
    dialog.current?.close();
  };

  return (
    <>
      <div className="mt-6 min-h-11">
        {name ? (
          <p className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full bg-blush px-5 py-2.5">
            <Sparkle className="h-4 w-4 shrink-0 text-berry" />
            <span>
              嗨，<strong className="text-berry">{name}</strong>！歡迎光臨糖糖甜點屋
            </span>
            <button
              type="button"
              onClick={() => dialog.current?.showModal()}
              className="text-sm text-ink/55 underline underline-offset-4 hover:text-berry"
            >
              換個稱呼
            </button>
          </p>
        ) : (
          name === null &&
          dismissed && (
            <button
              type="button"
              onClick={() => dialog.current?.showModal()}
              className="text-sm text-ink/60 underline decoration-berry underline-offset-4 hover:text-berry"
            >
              留下你的稱呼，讓我們好好招呼你 →
            </button>
          )
        )}
      </div>

      <dialog
        ref={dialog}
        onClose={() => setDismissed(true)}
        className="m-auto w-[min(26rem,calc(100%-2rem))] rounded-[2rem] bg-cream p-0 text-ink ring-2 ring-ink shadow-[6px_6px_0_var(--color-ink)] backdrop:bg-ink/50"
      >
        <form onSubmit={submit} className="px-7 pt-10 pb-8 text-center sm:px-9">
          <p className="font-display text-sm italic text-berry-dark">Welcome</p>
          <h2 className="mt-1 text-2xl sm:text-3xl">歡迎光臨！</h2>
          <p className="mt-3 text-ink/70">該怎麼稱呼你呢？</p>
          <input
            name="name"
            required
            autoFocus
            maxLength={20}
            defaultValue={name ?? ""}
            placeholder="例如：小美"
            aria-label="你的稱呼"
            className="mt-6 w-full rounded-full bg-paper px-5 py-3 text-center ring-2 ring-ink/20 outline-none focus:ring-berry"
          />
          <button type="submit" className="mt-5 w-full rounded-full bg-ink px-8 py-3 text-paper transition hover:bg-berry">
            進來逛逛 →
          </button>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="mt-3 text-sm text-ink/50 hover:text-ink"
          >
            先略過
          </button>
        </form>
      </dialog>
    </>
  );
}
