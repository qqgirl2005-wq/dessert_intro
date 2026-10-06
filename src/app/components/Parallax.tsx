"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** 位移倍率：正數往前浮（比捲動快），負數往後沉（比捲動慢），0 表示不動 */
  speed?: number;
  /** 最大位移量（px），避免碰到相鄰內容 */
  max?: number;
  /** 改以最近符合此 selector 的祖先來量測，讓同一群元素位移一致 */
  anchor?: string;
  className?: string;
  children: React.ReactNode;
};

// 滾動視差：依元素與視窗中心的距離做位移。
// 量測外層（不位移）、位移內層，避免 transform 影響量測結果。
export default function Parallax({ speed = 0.1, max = Infinity, anchor, className, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = inner.current;
    const box = anchor ? outer.current?.closest(anchor) : outer.current;
    if (!box || !layer || speed === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce.matches) {
        layer.style.transform = "";
        return;
      }
      const rect = box.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh / 2 || rect.top > vh * 1.5) return; // 離畫面太遠就不算
      // 元素中心對齊視窗中心時不位移；第一屏的元素以頁面頂端為基準、捲不到中心的元素以頁底為基準，避免一開頁就偏離原位
      const center = rect.top + rect.height / 2;
      const pageCenter = center + window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const rest = pageCenter < vh ? pageCenter : Math.max(vh / 2, pageCenter - maxScroll);
      const offset = Math.max(-max, Math.min(max, (center - rest) * speed));
      layer.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
  }, [speed, max, anchor]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="relative h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
