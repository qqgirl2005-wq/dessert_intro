"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/#menu", label: "菜單", en: "Menu" },
  { href: "/#about", label: "品牌故事", en: "Story" },
  { href: "/#visit", label: "來店", en: "Visit" },
  { href: "/blog", label: "部落格", en: "Journal" },
  { href: "/game", label: "小遊戲", en: "Play" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-paper/85 backdrop-blur-md">
      <div className="bg-ink px-4 py-1.5 text-center text-xs tracking-wider text-paper">
        生日蛋糕請於三天前預訂 — 滿 NT$500 享宅配免運
      </div>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 border-b border-ink/15 px-4 py-3 sm:px-6">
        <Link href="/" onClick={close} className="group flex items-baseline gap-2 leading-none">
          <span className="font-display text-3xl italic text-berry transition group-hover:-rotate-3">Sweetie</span>
          <span className="hidden text-sm sm:inline">糖糖甜點屋</span>
        </Link>

        {/* 平板、桌機：橫向導覽 */}
        <ul className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex flex-col items-center rounded-full px-3 py-1 text-sm transition hover:bg-blush/60"
              >
                <span>{l.label}</span>
                <span className="font-display text-[10px] italic opacity-50 group-hover:text-berry group-hover:opacity-100">
                  {l.en}
                </span>
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="tel:0212345678"
              className="rounded-full border-2 border-ink px-4 py-2 text-sm transition hover:bg-ink hover:text-paper"
            >
              預訂蛋糕
            </a>
          </li>
        </ul>

        {/* 手機：漢堡按鈕 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "關閉選單" : "開啟選單"}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink md:hidden"
        >
          <span
            className={`absolute h-0.5 w-5 rounded bg-ink transition ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span className={`absolute h-0.5 w-5 rounded bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`absolute h-0.5 w-5 rounded bg-ink transition ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </nav>

      {/* 手機：展開選單 */}
      <div
        id="mobile-nav"
        className={`grid border-b border-ink/15 transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-1 px-4 pt-2 pb-5">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  tabIndex={open ? 0 : -1}
                  className="flex items-baseline justify-between rounded-2xl px-4 py-3 text-lg transition hover:bg-blush/60"
                >
                  {l.label}
                  <span className="font-display text-sm italic text-berry">{l.en}</span>
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="tel:0212345678"
                onClick={close}
                tabIndex={open ? 0 : -1}
                className="block rounded-full bg-ink px-6 py-3.5 text-center text-paper transition hover:bg-berry"
              >
                預訂蛋糕 02-1234-5678
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
