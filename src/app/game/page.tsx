import type { Metadata } from "next";
import { Sparkle } from "../components/Illustrations";
import SectionLabel from "../components/SectionLabel";
import CakeCatcher from "./CakeCatcher";

export const metadata: Metadata = {
  title: "接蛋糕小遊戲｜糖糖甜點屋 Sweetie Bakery",
  description: "15 秒內接住從天上掉下來的甜點，看看你能拿幾分！",
};

export default function GamePage() {
  return (
    <main className="flex-1 overflow-x-clip">
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-20 sm:pb-24">
        <SectionLabel no="05" en="Mini Game" />
        <div className="mt-3 mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <h1 className="text-5xl leading-tight sm:text-6xl">
            接<span className="text-berry">蛋糕</span>
            <Sparkle className="ml-2 inline-block h-6 w-6 -translate-y-6 text-butter sm:h-8 sm:w-8" />
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            甜點從天上掉下來了！拿好盤子，15 秒內能接住幾個？
          </p>
        </div>
        <CakeCatcher />
      </section>
    </main>
  );
}
