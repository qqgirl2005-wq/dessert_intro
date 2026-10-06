// 部落格文章資料。照片來源同首頁（詳見 public/images/desserts/CREDITS.md）

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type Post = {
  slug: string;
  title: string;
  en: string;
  category: string;
  categoryEn: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  excerpt: string;
  cover: string;
  coverAlt: string;
  tint: string;
  credit: { author: string; license: string; url: string };
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "strawberry-shortcake-story",
    title: "一顆草莓的旅程：糖糖的草莓鮮奶油蛋糕",
    en: "The Journey of a Strawberry",
    category: "店裡的故事",
    categoryEn: "Behind the Counter",
    date: "2026-09-18",
    readMinutes: 4,
    excerpt: "從大湖的草莓園，到清晨五點的烤箱，再到你盤子裡那一片。聊聊糖糖第一款甜點背後的小堅持。",
    cover: "/images/desserts/strawberry-shortcake.jpg",
    coverAlt: "草莓鮮奶油蛋糕切片",
    tint: "bg-blush",
    credit: { author: "Naotake Murayama", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Strawberry_Shortcake_(6639268625).jpg" },
    body: [
      { type: "p", text: "2019 年開店的第一天，櫃子裡只有一款蛋糕：草莓鮮奶油蛋糕。六年過去，菜單變長了，但它一直是賣得最快、也是小糖最捨不得改的那一款。" },
      { type: "h2", text: "為什麼一定要大湖草莓" },
      { type: "p", text: "我們試過很多產地的草莓，最後還是回到苗栗大湖。這裡的草莓酸味比較明亮，剛好能壓住鮮奶油的厚重感，咬下去是「酸—甜—奶香」三段式的味道。" },
      { type: "p", text: "合作的是一對在大湖種了二十年草莓的夫妻。每週二、五清晨，他們會把前一晚採收、還帶著涼意的草莓送到店門口。草莓不夠漂亮、不夠熟的那幾天，我們寧可少做幾顆蛋糕。" },
      { type: "h2", text: "一片蛋糕的早晨" },
      {
        type: "list",
        ordered: true,
        items: [
          "05:00　烤海綿蛋糕。蛋白打到濕性發泡就停，讓蛋糕保有濕潤的口感。",
          "06:30　蛋糕放涼的同時，把草莓一顆顆擦乾、對半切開。",
          "08:00　打發北海道鮮奶油，只加一點點糖，讓奶香自己說話。",
          "09:00　三層海綿、兩層草莓，一邊組裝一邊修整成圓。",
          "11:00　冷藏定型兩小時後，準時上櫃。",
        ],
      },
      { type: "quote", text: "草莓是主角，蛋糕只是舞台。", cite: "店長 小糖" },
      { type: "h2", text: "最好吃的時間" },
      { type: "p", text: "鮮奶油蛋糕最怕放。買回家的話，建議兩小時內吃完；如果真的要冰，記得吃之前先放在室溫十分鐘，奶油的香氣會回來。" },
      { type: "p", text: "草莓季大約從十二月到隔年四月。想訂 6 吋整模的朋友，記得三天前打電話給我們。" },
    ],
  },
  {
    slug: "caramel-pudding-tips",
    title: "在家做焦糖布丁，不失敗的 5 個小訣竅",
    en: "5 Tips for a Perfect Caramel Pudding",
    category: "甜點教室",
    categoryEn: "Baking Notes",
    date: "2026-09-05",
    readMinutes: 5,
    excerpt: "布丁表面坑坑洞洞？焦糖一煮就苦？把店裡每天在做的小細節整理出來，照著做，在家也能做出搖一搖會晃的滑嫩布丁。",
    cover: "/images/desserts/caramel-pudding.jpg",
    coverAlt: "盤子上的焦糖布丁",
    tint: "bg-butter",
    credit: { author: "Clairenguyen23", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:Japanese_Caramel_Custard_Pudding,_Purin,_Flan.jpg" },
    body: [
      { type: "p", text: "焦糖布丁看起來簡單，材料只有蛋、牛奶、糖，卻是最考驗耐心的甜點。這篇把我們在店裡反覆調整過的做法整理出來，給想在家試試看的你。" },
      { type: "h2", text: "準備材料（約 4 杯）" },
      {
        type: "list",
        items: ["全蛋 2 顆＋蛋黃 1 顆", "全脂牛奶 300ml", "細砂糖 40g（布丁液）", "細砂糖 50g＋熱水 15ml（焦糖）", "香草莢 1/4 根，或香草精幾滴"],
      },
      { type: "h2", text: "訣竅一：焦糖別攪拌，用晃的" },
      { type: "p", text: "糖放進鍋子後就不要用湯匙攪，改成輕輕搖晃鍋子，糖才不會反砂結塊。顏色變成紅茶色時立刻離火，加入熱水（小心噴濺），苦味就剛剛好。" },
      { type: "h2", text: "訣竅二：牛奶溫熱就好" },
      { type: "p", text: "牛奶加熱到鍋邊冒小泡泡、大約 60°C 就可以了。太燙的牛奶會把蛋煮熟，布丁就會有顆粒感。" },
      { type: "h2", text: "訣竅三：過篩兩次，再撈掉泡泡" },
      { type: "p", text: "布丁液至少過篩兩次，最後用紙巾輕輕貼一下表面，把小泡泡吸走。這一步做好，布丁表面才會像鏡子一樣光滑。" },
      { type: "h2", text: "訣竅四：低溫、隔水、蓋上鋁箔" },
      { type: "p", text: "烤盤注入約 1 公分高的熱水，每個杯子蓋上鋁箔紙，以 150°C 烤 35–40 分鐘。溫度寧可低一點、時間長一點，布丁才不會出現蜂巢般的氣孔。" },
      { type: "h2", text: "訣竅五：冰一個晚上" },
      { type: "p", text: "剛出爐的布丁還在「長大」。放涼後冷藏至少 6 小時，最好一整晚，口感會從軟嫩變成綿密。" },
      { type: "quote", text: "搖一搖，會晃，但不會散，就是最剛好的熟度。", cite: "甜點師 阿布" },
      { type: "p", text: "做失敗了也沒關係，歡迎來店裡吃一顆我們的，當作參考答案。" },
    ],
  },
  {
    slug: "less-sugar",
    title: "減糖 20%，甜點還會好吃嗎？",
    en: "Less Sugar, More Flavor",
    category: "我們的堅持",
    categoryEn: "Our Philosophy",
    date: "2026-08-22",
    readMinutes: 4,
    excerpt: "糖不只是甜味，還負責保濕、定型、上色。少了它，甜點要靠什麼撐起來？說說糖糖每個配方都減糖 20% 背後的功課。",
    cover: "/images/desserts/fruit-tart.jpg",
    coverAlt: "鋪滿水果的水果塔",
    tint: "bg-pistachio",
    credit: { author: "Garry Knight", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Fruit_tart_with_kiwi,_peach,_and_raspberry.jpg" },
    body: [
      { type: "p", text: "常有客人問：「你們的甜點吃起來不膩，是不是偷偷少放糖？」答案是：沒有偷偷，是光明正大地少放。糖糖所有配方，都比一般食譜少 20% 的糖。" },
      { type: "h2", text: "糖在甜點裡，其實身兼數職" },
      {
        type: "list",
        items: [
          "保濕：糖會抓住水分，讓蛋糕放一天也不乾。",
          "定型：打發蛋白時，糖讓泡沫更穩定。",
          "上色：烘烤時的焦糖化反應，帶來金黃色和香氣。",
        ],
      },
      { type: "p", text: "所以減糖不是把數字改小就好。直接少放，蛋糕會變乾、塌陷、顏色蒼白。我們花了將近一年，一款一款重新調整配方。" },
      { type: "h2", text: "少了糖，用什麼補回來" },
      { type: "p", text: "第一是水果本身的甜與酸。像季節水果塔，我們會挑熟度剛好的水果，讓果香成為甜味的主角，卡士達醬就能做得更清爽。" },
      { type: "p", text: "第二是香氣。真正的香草莢、烤得更深一點的塔皮、焦香的奶油，這些香氣會讓大腦覺得「很滿足」，不需要那麼多甜味。" },
      { type: "p", text: "第三是一小撮鹽。鹽能讓甜味更立體，這是很多甜點師的小祕密。" },
      { type: "quote", text: "我們想做的，是吃完一整塊，還會想再來一塊的甜點。", cite: "店長 小糖" },
      { type: "h2", text: "給想在家減糖的你" },
      { type: "p", text: "建議一次減 10% 就好，先從有水果、有堅果的甜點開始試。打發蛋白的糖盡量不要減，其他部分再慢慢調整。你的味蕾會比想像中更快習慣。" },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
