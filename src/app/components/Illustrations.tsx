// 手繪風甜點插圖：統一深可可色描邊 + 小臉，維持品牌一致感

const C = {
  ink: "#3a2420",
  cream: "#fffaf3",
  blush: "#f6cfd3",
  berry: "#e2485d",
  butter: "#f2d98b",
  pistachio: "#c9d9a8",
  caramel: "#b8683a",
  dough: "#dca468",
  doughDark: "#b97a3d",
};

type Props = { className?: string };

function Face({ x, y, gap = 16 }: { x: number; y: number; gap?: number }) {
  const l = x - gap / 2;
  const r = x + gap / 2;
  return (
    <g>
      <ellipse cx={l - 5} cy={y + 5} rx={4} ry={2.5} fill={C.berry} opacity={0.35} stroke="none" />
      <ellipse cx={r + 5} cy={y + 5} rx={4} ry={2.5} fill={C.berry} opacity={0.35} stroke="none" />
      <circle cx={l} cy={y} r={2.4} fill={C.ink} stroke="none" />
      <circle cx={r} cy={y} r={2.4} fill={C.ink} stroke="none" />
      <path d={`M${x - 4} ${y + 5} Q${x} ${y + 9} ${x + 4} ${y + 5}`} fill="none" strokeWidth={2.4} />
    </g>
  );
}

function Svg({ className, children }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <g stroke={C.ink} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        {children}
      </g>
    </svg>
  );
}

export function Shortcake({ className }: Props) {
  return (
    <Svg className={className}>
      <ellipse cx="60" cy="96" rx="42" ry="7" fill={C.cream} />
      <path d="M26 58 H94 V88 Q94 94 88 94 H32 Q26 94 26 88 Z" fill={C.cream} />
      <path d="M26 74 H94" strokeWidth={2} />
      <path
        d="M24 58 Q24 48 34 48 H86 Q96 48 96 58 Q96 64 90 64 Q86 64 84 60 Q80 68 74 62 Q68 70 62 62 Q56 68 50 62 Q44 70 38 62 Q34 66 30 64 Q24 64 24 58 Z"
        fill={C.blush}
      />
      <path d="M60 47 C49 40 50 27 60 30 C70 27 71 40 60 47 Z" fill={C.berry} />
      <path d="M53 30 L57 24 L60 29 L63 24 L67 30" fill={C.pistachio} strokeWidth={2.4} />
      <circle cx="56" cy="36" r="1.2" fill={C.butter} stroke="none" />
      <circle cx="63" cy="35" r="1.2" fill={C.butter} stroke="none" />
      <circle cx="60" cy="41" r="1.2" fill={C.butter} stroke="none" />
      <Face x={60} y={82} />
    </Svg>
  );
}

export function Pudding({ className }: Props) {
  return (
    <Svg className={className}>
      <ellipse cx="60" cy="94" rx="40" ry="7" fill={C.cream} />
      <path d="M34 92 L42 46 Q60 40 78 46 L86 92 Z" fill={C.butter} />
      <path
        d="M42 46 Q60 40 78 46 L76 58 Q71 64 67 58 Q61 66 55 58 Q49 64 44 58 Z"
        fill={C.caramel}
      />
      <circle cx="60" cy="34" r="7" fill={C.berry} />
      <path d="M60 27 Q61 18 68 15" fill="none" strokeWidth={2.4} />
      <Face x={60} y={74} />
    </Svg>
  );
}

export function Macaron({ className }: Props) {
  return (
    <Svg className={className}>
      <path d="M26 62 Q26 40 60 40 Q94 40 94 62 Z" fill={C.blush} />
      <rect x="28" y="62" width="64" height="9" rx="3" fill={C.cream} />
      <path d="M26 71 H94 Q94 92 60 92 Q26 92 26 71 Z" fill={C.blush} />
      <Face x={60} y={78} />
    </Svg>
  );
}

export function Donut({ className }: Props) {
  return (
    <Svg className={className}>
      <circle cx="60" cy="62" r="34" fill={C.dough} />
      <path
        d="M60 32 Q72 30 80 38 Q90 42 88 54 Q94 64 88 72 Q88 84 76 86 Q68 94 58 90 Q46 94 40 86 Q28 84 30 72 Q24 62 32 52 Q30 40 42 38 Q48 30 60 32 Z"
        fill={C.blush}
      />
      <circle cx="60" cy="60" r="9" fill={C.cream} />
      <g strokeWidth={2.6}>
        <path d="M44 44 L48 42" stroke={C.berry} />
        <path d="M74 42 L78 46" stroke={C.pistachio} />
        <path d="M82 60 L83 65" stroke={C.butter} />
        <path d="M38 58 L40 62" stroke={C.pistachio} />
        <path d="M58 40 L62 40" stroke={C.butter} />
      </g>
      <Face x={60} y={74} gap={14} />
    </Svg>
  );
}

export function BearCookie({ className }: Props) {
  return (
    <Svg className={className}>
      <circle cx="36" cy="40" r="11" fill={C.dough} />
      <circle cx="84" cy="40" r="11" fill={C.dough} />
      <circle cx="36" cy="40" r="5" fill={C.doughDark} stroke="none" />
      <circle cx="84" cy="40" r="5" fill={C.doughDark} stroke="none" />
      <circle cx="60" cy="64" r="32" fill={C.dough} />
      <ellipse cx="60" cy="76" rx="13" ry="10" fill={C.cream} />
      <ellipse cx="60" cy="72" rx="4.5" ry="3" fill={C.ink} stroke="none" />
      <path d="M60 75 V79 M55 80 Q57.5 83 60 79 Q62.5 83 65 80" fill="none" strokeWidth={2.2} />
      <circle cx="48" cy="60" r="2.4" fill={C.ink} stroke="none" />
      <circle cx="72" cy="60" r="2.4" fill={C.ink} stroke="none" />
      <ellipse cx="41" cy="70" rx="4" ry="2.5" fill={C.berry} opacity={0.35} stroke="none" />
      <ellipse cx="79" cy="70" rx="4" ry="2.5" fill={C.berry} opacity={0.35} stroke="none" />
    </Svg>
  );
}

export function Parfait({ className }: Props) {
  return (
    <Svg className={className}>
      <rect x="74" y="16" width="8" height="34" rx="3" fill={C.butter} transform="rotate(18 78 33)" />
      <path d="M36 52 Q36 28 60 28 Q84 28 84 52 Z" fill={C.pistachio} />
      <circle cx="52" cy="40" r="2" fill={C.caramel} stroke="none" />
      <circle cx="66" cy="36" r="2" fill={C.caramel} stroke="none" />
      <circle cx="70" cy="46" r="2" fill={C.caramel} stroke="none" />
      <path d="M32 52 H88 L80 86 Q60 94 40 86 Z" fill={C.cream} />
      <path d="M36 68 H84" strokeWidth={2} />
      <rect x="54" y="90" width="12" height="7" fill={C.cream} />
      <ellipse cx="60" cy="100" rx="17" ry="4" fill={C.cream} />
      <Face x={60} y={74} />
    </Svg>
  );
}

export function Sparkle({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="currentColor" />
    </svg>
  );
}
