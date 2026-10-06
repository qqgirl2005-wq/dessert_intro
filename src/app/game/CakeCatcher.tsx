"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BearCookie, Donut, Macaron, Parfait, Pudding, Shortcake, Sparkle } from "../components/Illustrations";
import { useGuestName } from "../components/WelcomeGuest";

const DURATION = 15;
const BEST_KEY = "cake-catcher-best";

// 座標以遊戲區百分比計：x 為寬度 %、y 為高度 %（遊戲區固定 3:4）
const ITEM_W = 14;
const PLATE_W = 26;
const PLATE_Y = 86;

const desserts = [
  { Comp: Pudding, points: 1 },
  { Comp: Macaron, points: 1 },
  { Comp: Donut, points: 1 },
  { Comp: BearCookie, points: 1 },
  { Comp: Parfait, points: 1 },
];
const BONUS = { Comp: Shortcake, points: 3 }; // 招牌草莓蛋糕，稀有又加分

type Item = { id: number; kind: number; x: number; y: number; rot: number; spin: number };
type Pop = { id: number; x: number; y: number; text: string; age: number };
type Game = {
  items: Item[];
  pops: Pop[];
  plateX: number;
  targetX: number | null;
  elapsed: number;
  spawnIn: number;
  score: number;
  nextId: number;
};
type View = Pick<Game, "items" | "pops" | "plateX" | "score"> & { timeLeft: number };
type Stage = "ready" | "playing" | "over";

const kindOf = (kind: number) => (kind < 0 ? BONUS : desserts[kind]);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function newGame(): Game {
  return { items: [], pops: [], plateX: 50, targetX: null, elapsed: 0, spawnIn: 0.3, score: 0, nextId: 0 };
}

function snapshot(g: Game): View {
  return {
    items: g.items.map((i) => ({ ...i })),
    pops: g.pops.map((p) => ({ ...p })),
    plateX: g.plateX,
    score: g.score,
    timeLeft: Math.max(0, DURATION - g.elapsed),
  };
}

// 推進一格：盤子移動、生成甜點、掉落、判定接住
function step(g: Game, dt: number, keyDir: number) {
  g.elapsed += dt;

  if (keyDir) {
    g.targetX = null;
    g.plateX += keyDir * 95 * dt;
  } else if (g.targetX !== null) {
    g.plateX += (g.targetX - g.plateX) * Math.min(1, dt * 18);
  }
  g.plateX = clamp(g.plateX, PLATE_W / 2, 100 - PLATE_W / 2);

  // 越後面掉越快、越密
  g.spawnIn -= dt;
  if (g.spawnIn <= 0) {
    g.spawnIn = Math.max(0.32, 0.6 - g.elapsed * 0.018);
    g.items.push({
      id: g.nextId++,
      kind: Math.random() < 0.12 ? -1 : Math.floor(Math.random() * desserts.length),
      x: 8 + Math.random() * 84,
      y: -8,
      rot: Math.random() * 360,
      spin: (Math.random() - 0.5) * 240,
    });
  }

  const speed = 38 + g.elapsed * 2.5;
  g.items = g.items.filter((it) => {
    it.y += speed * dt;
    it.rot += it.spin * dt;
    const caught = it.y > PLATE_Y - 6 && it.y < PLATE_Y + 4 && Math.abs(it.x - g.plateX) < (PLATE_W + ITEM_W) / 2 - 3;
    if (caught) {
      const { points } = kindOf(it.kind);
      g.score += points;
      g.pops.push({ id: g.nextId++, x: it.x, y: PLATE_Y - 10, text: `+${points}`, age: 0 });
      return false;
    }
    return it.y < 110;
  });

  g.pops = g.pops.filter((p) => (p.age += dt) < 0.7);
}

// 最高分只存在這台瀏覽器
const bestListeners = new Set<() => void>();
function readBest() {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}
function saveBest(score: number) {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {}
  bestListeners.forEach((cb) => cb());
}
function subscribeBest(cb: () => void) {
  bestListeners.add(cb);
  return () => bestListeners.delete(cb);
}

function rank(score: number) {
  if (score >= 30) return "糖糖傳奇主廚";
  if (score >= 20) return "甜點達人";
  if (score >= 10) return "接蛋糕好手";
  return "甜點小學徒";
}

function Plate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 34" className={className} aria-hidden>
      <ellipse cx="60" cy="20" rx="56" ry="12" fill="#fffaf3" stroke="#3a2420" strokeWidth="3.5" />
      <ellipse cx="60" cy="17" rx="38" ry="6" fill="none" stroke="#f6cfd3" strokeWidth="3" />
      <path d="M30 31 Q60 36 90 31" fill="none" stroke="#3a2420" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function CakeCatcher() {
  const field = useRef<HTMLDivElement>(null);
  const game = useRef<Game>(newGame());
  const [stage, setStage] = useState<Stage>("ready");
  const [view, setView] = useState<View>(() => snapshot(newGame()));
  const [last, setLast] = useState({ score: 0, newBest: false });
  const best = useSyncExternalStore(subscribeBest, readBest, () => 0);
  const name = useGuestName();

  const start = () => {
    game.current = newGame();
    setView(snapshot(game.current));
    setStage("playing");
  };

  useEffect(() => {
    if (stage !== "playing") return;
    const g = game.current;
    const keys = new Set<string>();
    const onKey = (e: KeyboardEvent) => {
      const dir = { ArrowLeft: "L", a: "L", A: "L", ArrowRight: "R", d: "R", D: "R" }[e.key];
      if (!dir) return;
      if (e.key.startsWith("Arrow")) e.preventDefault();
      if (e.type === "keydown") keys.add(dir);
      else keys.delete(dir);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);

    let raf = 0;
    let prev = performance.now();
    const loop = (now: number) => {
      // 切到別的分頁時 rAF 會暫停，限制單格時間避免回來時瞬間跳很多
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      step(g, dt, (keys.has("R") ? 1 : 0) - (keys.has("L") ? 1 : 0));
      setView(snapshot(g));
      if (g.elapsed >= DURATION) {
        const prevBest = readBest();
        if (g.score > prevBest) saveBest(g.score);
        setLast({ score: g.score, newBest: g.score > prevBest && g.score > 0 });
        setStage("over");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [stage]);

  const aim = (e: React.PointerEvent<HTMLDivElement>) => {
    if (stage !== "playing" || !field.current) return;
    const rect = field.current.getBoundingClientRect();
    game.current.targetX = ((e.clientX - rect.left) / rect.width) * 100;
  };

  const timeLeft = Math.ceil(view.timeLeft);

  return (
    <div className="mx-auto w-full max-w-md">
      {/* 計分板 */}
      <div className="mb-4 flex items-center justify-between rounded-full bg-cream px-5 py-3 ring-2 ring-ink">
        <p>
          得分 <span className="font-display ml-1 text-2xl text-berry tabular-nums">{view.score}</span>
        </p>
        <p className={timeLeft <= 5 && stage === "playing" ? "text-berry" : ""}>
          剩餘 <span className="font-display ml-1 text-2xl tabular-nums">{timeLeft}</span> 秒
        </p>
      </div>

      <div
        ref={field}
        onPointerMove={aim}
        onPointerDown={aim}
        className="relative aspect-[3/4] touch-none overflow-hidden rounded-[2rem] bg-blush ring-2 ring-ink shadow-[6px_6px_0_var(--color-ink)] select-none"
      >
        {/* 時間條 */}
        <div className="absolute inset-x-0 top-0 h-2 bg-ink/10">
          <div className="h-full bg-berry" style={{ width: `${(view.timeLeft / DURATION) * 100}%` }} />
        </div>

        {view.items.map((it) => {
          const { Comp } = kindOf(it.kind);
          return (
            <div
              key={it.id}
              className="absolute"
              style={{
                left: `${it.x}%`,
                top: `${it.y}%`,
                width: `${ITEM_W}%`,
                transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
              }}
            >
              <Comp className="w-full" />
            </div>
          );
        })}

        {view.pops.map((p) => (
          <span
            key={p.id}
            className="font-display absolute -translate-x-1/2 text-2xl text-berry-dark"
            style={{ left: `${p.x}%`, top: `${p.y - p.age * 14}%`, opacity: 1 - p.age / 0.7 }}
          >
            {p.text}
          </span>
        ))}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${view.plateX}%`, top: `${PLATE_Y}%`, width: `${PLATE_W}%` }}
        >
          <Plate className="w-full" />
        </div>

        {stage !== "playing" && (
          <div className="absolute inset-0 grid place-items-center bg-ink/35 p-6">
            <div className="w-full rounded-[1.75rem] bg-cream px-6 py-8 text-center ring-2 ring-ink">
              {stage === "ready" ? (
                <>
                  <p className="font-display text-sm italic text-berry-dark">Cake Catcher</p>
                  <h2 className="mt-1 text-2xl">{name ? `${name}，準備好了嗎？` : "準備好了嗎？"}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">
                    {DURATION} 秒內移動盤子接住甜點！
                    <br />
                    一般甜點 +1，草莓蛋糕 <strong className="text-berry">+3</strong>
                  </p>
                  <p className="mt-2 text-xs text-ink/50">滑鼠／手指拖曳，或用 ← → 鍵移動</p>
                </>
              ) : (
                <>
                  <p className="font-display text-sm italic text-berry-dark">Time&apos;s up!</p>
                  <p className="font-display mt-2 text-6xl text-berry tabular-nums">{last.score}</p>
                  <p className="mt-2 text-lg">{rank(last.score)}</p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-ink/60">
                    {last.newBest && <Sparkle className="h-4 w-4 text-berry" />}
                    {last.newBest ? "刷新最高紀錄！" : `最高紀錄 ${best} 分`}
                  </p>
                </>
              )}
              <button
                type="button"
                onClick={start}
                className="mt-6 rounded-full bg-ink px-8 py-3 text-paper transition hover:bg-berry"
              >
                {stage === "ready" ? "開始遊戲 →" : "再玩一次 →"}
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-ink/45">純屬娛樂，分數不兌換任何優惠 🍰</p>
    </div>
  );
}
