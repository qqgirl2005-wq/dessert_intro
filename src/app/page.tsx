import Image from "next/image";
import { BearCookie, Macaron, Pudding, Shortcake, Sparkle } from "./components/Illustrations";
import Parallax from "./components/Parallax";
import PuddingLottery from "./components/PuddingLottery";
import SectionLabel from "./components/SectionLabel";
import WelcomeGuest from "./components/WelcomeGuest";

// 照片來源：Wikimedia Commons（詳見 public/images/desserts/CREDITS.md）
const featured = {
  photo: "/images/desserts/strawberry-shortcake.jpg",
  credit: { author: "Naotake Murayama", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Strawberry_Shortcake_(6639268625).jpg" },
};

const menu = [
  {
    photo: "/images/desserts/caramel-pudding.jpg",
    name: "焦糖布丁",
    en: "Caramel Pudding",
    desc: "搖一搖會晃的滑嫩口感，焦糖熬到微苦剛好。",
    price: 65,
    credit: { author: "Clairenguyen23", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Japanese_Caramel_Custard_Pudding,_Purin,_Flan.jpg" },
  },
  {
    photo: "/images/desserts/macaron.jpg",
    name: "法式馬卡龍",
    en: "French Macarons",
    desc: "檸檬、覆盆子、開心果三種口味，外殼薄脆。",
    price: 50,
    credit: { author: "Tatiana Lapina", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Colorful_Macarons_(Unsplash).jpg" },
  },
  {
    photo: "/images/desserts/donut.jpg",
    name: "草莓糖霜甜甜圈",
    en: "Strawberry Glazed Donut",
    desc: "每天早上現炸，淋上粉嫩草莓糖霜。",
    price: 55,
    credit: { author: "Evan-Amos", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Pink-Frosted-Donut.jpg" },
  },
  {
    photo: "/images/desserts/matcha-parfait.jpg",
    name: "宇治抹茶聖代",
    en: "Uji Matcha Parfait",
    desc: "濃抹茶冰淇淋、蜜紅豆與白玉，清爽不膩。",
    price: 110,
    credit: { author: "Misaochan2", license: "CC BY 4.0", url: "https://commons.wikimedia.org/wiki/File:Matcha_parfait_at_dessert_parlour_in_Brisbane.jpg" },
  },
  {
    photo: "/images/desserts/fruit-tart.jpg",
    name: "季節水果塔",
    en: "Seasonal Fruit Tart",
    desc: "酥脆塔皮、香草卡士達，鋪滿當季水果。",
    price: 130,
    credit: { author: "Garry Knight", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Fruit_tart_with_kiwi,_peach,_and_raspberry.jpg" },
  },
  {
    photo: "/images/desserts/cheesecake.jpg",
    name: "莓果起司蛋糕",
    en: "Berry Cheesecake",
    desc: "濃郁乳酪底，鋪上酸甜莓果醬。",
    price: 120,
    credit: { author: "Martin van Dam", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Cheesecake_with_slice_cut_out.jpg" },
  },
  {
    // 去背圖：放大後溢出拱門框（由 cupcake.jpg 裁切，授權同原圖）
    photo: "/images/desserts/cupcake-cutout.png",
    cutout: true,
    name: "紫芋杯子蛋糕",
    en: "Taro Cupcake",
    desc: "巧克力蛋糕體，擠上一朵紫芋奶油霜。",
    price: 85,
    credit: { author: "Noah Wulf", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Chocolate_Cupcake_with_Purple_frosting.jpg" },
  },
  {
    photo: "/images/desserts/butter-cookies.jpg",
    name: "丹麥奶油曲奇",
    en: "Danish Butter Cookies",
    desc: "一口一個的酥香曲奇，附可愛鐵盒。",
    price: 150,
    credit: { author: "sdnet01", license: "CC0", url: "https://commons.wikimedia.org/wiki/File:Danish-butter-cookies-1032894.jpg" },
  },
];

const tints = ["bg-butter", "bg-blush", "bg-pistachio"];

const principles = [
  { title: "當天做，當天賣", desc: "清晨五點開烤，賣完就收工，不留隔夜甜點。" },
  { title: "少一點糖", desc: "每個配方都減糖 20%，讓食材本來的味道說話。" },
  { title: "認識每一位小農", desc: "雞蛋、牛奶、草莓都來自我們拜訪過的農場。" },
];

const hours = [
  ["週二 – 週五", "11:00 – 20:00"],
  ["週六 – 週日", "10:00 – 20:00"],
  ["週一", "公休"],
];

const marqueeItems = ["Strawberry Shortcake", "Caramel Pudding", "Macaron", "Matcha Parfait", "Butter Cookies", "Donut"];

function Leader() {
  return <span className="mx-2 mb-1.5 flex-1 border-b-2 border-dotted border-ink/30" />;
}

export default function Home() {
  return (
    <main className="flex-1 overflow-x-clip">
      {/* ── 主視覺 ── */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 sm:pt-12 sm:pb-20 md:grid-cols-[1.15fr_1fr] md:gap-8 md:pt-20 lg:gap-12">
        <div>
          <p className="font-display text-sm tracking-[0.25em] uppercase opacity-60">Pâtisserie · Taipei · Since 2019</p>
          <WelcomeGuest />
          <h1 className="mt-6 text-5xl leading-[1.25] sm:text-6xl md:text-[3.5rem] lg:text-7xl">
            把今天
            <br />
            過得
            <span className="relative inline-block text-berry">
              甜
              <svg
                className="absolute -bottom-2 left-0 h-4 w-full text-berry"
                viewBox="0 0 100 16"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path d="M2 10 Q 20 2 35 9 T 65 8 T 98 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            一點。
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/75 sm:mt-8 sm:text-lg">
            糖糖是一間藏在巷子裡的小甜點店。
            我們只做自己也會想吃的甜點——軟軟的、香香的，吃完會想笑的那種。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-paper transition hover:bg-berry"
            >
              看今天的甜點
              <span className="transition group-hover:translate-x-1">→</span>
            </a>
            <a href="#visit" className="underline decoration-berry decoration-2 underline-offset-8 hover:text-berry">
              預訂生日蛋糕
            </a>
            <PuddingLottery />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-md">
          {/* 拱門背景 */}
          <div className="aspect-[4/5] rounded-t-full rounded-b-[2.5rem] bg-blush" />
          <Parallax speed={0.25} className="absolute inset-x-[8%] top-[18%] w-[84%]">
            <Shortcake className="animate-bob w-full drop-shadow-[0_12px_0_rgba(58,36,32,0.08)]" />
          </Parallax>

          {/* 旋轉印章 */}
          <Parallax speed={-0.35} className="absolute -top-4 -left-4 h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
            <svg viewBox="0 0 100 100" className="animate-spin-slow h-full w-full" aria-hidden>
              <defs>
                <path id="stamp" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
              </defs>
              <circle cx="50" cy="50" r="48" fill="var(--color-butter)" />
              <text className="font-display" fontSize="10.5" letterSpacing="2.2" fill="var(--color-ink)">
                <textPath href="#stamp">HANDMADE DAILY · 每日手作 · </textPath>
              </text>
            </svg>
            <Sparkle className="absolute inset-0 m-auto h-7 w-7 text-berry" />
          </Parallax>

          <Parallax speed={0.5} className="absolute -right-3 bottom-10">
            <div className="rotate-6 rounded-2xl bg-cream px-4 py-3 shadow-[4px_4px_0_var(--color-ink)] ring-2 ring-ink">
              <p className="font-display text-xs italic text-berry">Signature</p>
              <p className="text-sm">草莓鮮奶油蛋糕</p>
            </div>
          </Parallax>
        </div>
      </section>

      {/* ── 跑馬燈 ── */}
      <div className="-rotate-1 bg-berry py-4 text-cream">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {marqueeItems.map((item) => (
                <span key={item} className="font-display flex items-center gap-6 px-3 text-xl italic sm:gap-8 sm:px-4 sm:text-3xl">
                  {item}
                  <Sparkle className="h-4 w-4 text-butter" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 菜單 ── */}
      <section id="menu" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel no="01" en="The Menu" />
            <h2 className="mt-3 text-4xl sm:text-5xl">今天櫃子裡有什麼</h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60">每日 11:00 出爐，數量有限，賣完就沒有囉。</p>
        </div>

        {/* 本月主打 */}
        <article className="mt-10 grid items-center gap-6 overflow-hidden rounded-[2rem] bg-blush p-6 sm:mt-12 sm:rounded-[2.5rem] sm:p-10 md:grid-cols-[1fr_1.1fr]">
          <div className="relative order-2 md:order-1">
            <span className="font-display inline-block -rotate-3 rounded-full bg-ink px-3 py-1 text-xs italic text-paper">
              Pick of the month
            </span>
            <h3 className="mt-4 text-3xl sm:text-4xl">草莓鮮奶油蛋糕</h3>
            <p className="font-display mt-1 italic text-berry-dark">Strawberry Shortcake</p>
            <p className="mt-5 max-w-sm leading-relaxed text-ink/75">
              大湖草莓切半夾進三層海綿蛋糕，搭配北海道鮮奶油。
              輕到像雲，酸甜剛剛好，是糖糖的第一款甜點。
            </p>
            <p className="mt-6 flex items-baseline">
              <span className="text-sm">單片 / 6 吋整模</span>
              <Leader />
              <span className="font-display text-2xl tabular-nums">120 / 880</span>
            </p>
          </div>
          <div className="order-1 flex justify-center md:order-2">
            <div className="relative aspect-square w-full max-w-[16rem] sm:max-w-sm">
              <Parallax speed={-0.12} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden rounded-full ring-8 ring-cream">
                  <Image
                    src={featured.photo}
                    alt="草莓鮮奶油蛋糕"
                    fill
                    sizes="(min-width: 768px) 384px, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </Parallax>
              <Parallax speed={0.4} className="absolute -bottom-2 -left-2 h-24 w-24 sm:h-28 sm:w-28">
                <Shortcake className="h-full w-full -rotate-12" />
              </Parallax>
            </div>
          </div>
        </article>

        {/* 其他品項 */}
        <div data-parallax-anchor className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-20 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {menu.map((d, i) => (
            // 奇數欄整欄慢一點，形成錯落的層次（以整個 grid 量測，同欄卡片才不會互相擠壓）
            <Parallax key={d.name} speed={i % 2 ? -0.12 : 0} max={56} anchor="[data-parallax-anchor]" className="h-full">
              <article className="group flex h-full flex-col">
                <div className={`relative aspect-[4/5] rounded-t-full rounded-b-[1.5rem] p-1.5 sm:rounded-b-[2rem] sm:p-2 ${d.cutout ? "" : "overflow-hidden"} ${tints[i % tints.length]}`}>
                  <div className={`relative h-full w-full overflow-hidden rounded-t-full rounded-b-[1.2rem] sm:rounded-b-[1.6rem] ${d.cutout ? "bg-cream" : ""}`}>
                    {!d.cutout && (
                      <Image
                        src={d.photo}
                        alt={d.name}
                        fill
                        sizes="(min-width: 1024px) 270px, 45vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  {d.cutout && (
                    <div className="absolute -inset-x-[6%] top-[12%] bottom-[5%] transition duration-500 group-hover:scale-105">
                      <Image
                        src={d.photo}
                        alt={d.name}
                        fill
                        sizes="(min-width: 1024px) 300px, 50vw"
                        className="object-contain object-bottom drop-shadow-[0_10px_8px_rgba(58,36,32,0.25)]"
                      />
                    </div>
                  )}
                  <span className="font-display absolute top-1/2 right-2.5 z-10 rounded-full bg-cream px-2 py-0.5 text-[10px] tabular-nums shadow-sm sm:right-4 sm:px-2.5 sm:py-1 sm:text-xs">
                    No.{String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 flex flex-1 flex-col px-1 sm:mt-4">
                  <h3 className="text-lg sm:text-xl">{d.name}</h3>
                  <p className="font-display text-xs italic text-berry-dark sm:text-sm">{d.en}</p>
                  <p className="mt-2 mb-4 text-[13px] leading-relaxed text-ink/70 sm:text-sm">{d.desc}</p>
                  <p className="mt-auto flex items-baseline text-sm">
                    NT$
                    <Leader />
                    <span className="font-display text-lg tabular-nums sm:text-xl">{d.price}</span>
                  </p>
                </div>
              </article>
            </Parallax>
          ))}
        </div>

        {/* 照片授權標示 */}
        <p className="mt-24 text-xs leading-relaxed text-ink/45">
          照片來源 Wikimedia Commons：
          {[featured, ...menu].map(({ credit }, i) => (
            <span key={credit.url}>
              {i > 0 && "、"}
              <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
                {credit.author}
              </a>{" "}
              ({credit.license})
            </span>
          ))}
        </p>
      </section>

      {/* ── 品牌故事 ── */}
      <section id="about" className="scroll-mt-28 bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div className="relative">
            <SectionLabel no="02" en="Our Story" />
            <Parallax speed={0.3} max={70} className="absolute -top-2 -left-2">
              <span className="font-display block text-[7rem] leading-none text-blush select-none sm:text-[10rem]" aria-hidden>
                &ldquo;
              </span>
            </Parallax>
            <blockquote className="relative mt-8 text-[1.75rem] leading-snug sm:mt-10 sm:text-4xl md:text-3xl lg:text-4xl">
              甜點不只是食物，
              <br />
              是讓人<span className="text-berry">忍不住笑出來</span>
              <br />
              的小魔法。
            </blockquote>
            <p className="mt-6 text-sm text-ink/60">— 店長 小糖</p>
            <div className="mt-8 flex gap-3 sm:mt-10">
              <Parallax speed={0.2} className="h-16 w-16 sm:h-20 sm:w-20">
                <Pudding className="h-full w-full -rotate-6" />
              </Parallax>
              <Parallax speed={0.38} className="h-16 w-16 sm:h-20 sm:w-20">
                <BearCookie className="h-full w-full rotate-3" />
              </Parallax>
              <Parallax speed={0.28} className="h-16 w-16 sm:h-20 sm:w-20">
                <Macaron className="h-full w-full -rotate-3" />
              </Parallax>
            </div>
          </div>

          <div>
            <p className="leading-loose text-ink/80">
              2019 年，小糖辭掉辦公室工作，在糖果路租下一間只有六個座位的小店。
              從一台家用烤箱開始，每天只做一款蛋糕。
              現在櫃子裡的甜點多了，但做法一直沒變。
            </p>
            <ol className="mt-8 border-t-2 border-ink sm:mt-10">
              {principles.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-ink/20 py-5 sm:grid-cols-[3rem_1fr] sm:py-6">
                  <span className="font-display text-2xl italic text-berry tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 來店資訊 ── */}
      <section id="visit" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16">
        <SectionLabel no="03" en="Come Visit" />
        <div className="mt-3 grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-10">
          <div>
            <h2 className="text-4xl sm:text-5xl">來店坐坐吧</h2>
            <p className="mt-6 text-lg">台北市甜甜區糖果路 123 號</p>
            <p className="text-sm text-ink/60">捷運甜甜站 2 號出口，步行 5 分鐘</p>
            <dl className="mt-8 max-w-sm space-y-3">
              {hours.map(([day, time]) => (
                <div key={day} className="flex items-baseline">
                  <dt>{day}</dt>
                  <Leader />
                  <dd className="font-display tabular-nums">{time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 預訂票券 */}
          <Parallax speed={-0.1} className="self-start">
            <div className="relative rounded-[2rem] bg-butter p-7 sm:p-10">
              <span className="absolute top-1/2 -left-4 h-8 w-8 -translate-y-1/2 rounded-full bg-paper" aria-hidden />
              <span className="absolute top-1/2 -right-4 h-8 w-8 -translate-y-1/2 rounded-full bg-paper" aria-hidden />
              <p className="font-display text-sm italic text-berry-dark">Birthday Cake Order</p>
              <h3 className="mt-2 text-2xl sm:text-3xl">生日蛋糕預訂</h3>
              <div className="my-6 border-t-2 border-dashed border-ink/30" />
              <p className="leading-relaxed text-ink/80">
                6 吋起訂，可指定水果與手寫祝福牌。請於取貨日三天前來電，我們會幫你把心意做成蛋糕。
              </p>
              <a
                href="tel:0212345678"
                className="mt-8 flex items-center justify-center gap-3 rounded-full bg-ink px-6 py-3 text-paper transition hover:bg-berry sm:inline-flex"
              >
                02-1234-5678 <span>→</span>
              </a>
            </div>
          </Parallax>
        </div>
      </section>
    </main>
  );
}
