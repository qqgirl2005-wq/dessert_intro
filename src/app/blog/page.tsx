import type { Metadata } from "next";
import { Sparkle } from "../components/Illustrations";
import SectionLabel from "../components/SectionLabel";
import PostCard from "./PostCard";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "甜點日記｜糖糖甜點屋 Sweetie Bakery",
  description: "糖糖甜點屋的部落格：店裡的故事、在家做甜點的小訣竅，還有我們對甜點的堅持。",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1 overflow-x-clip">
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-12 sm:px-6 sm:pt-20 sm:pb-16">
        <SectionLabel no="04" en="Sweet Journal" />
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h1 className="text-5xl leading-tight sm:text-6xl">
            甜點<span className="text-berry">日記</span>
            <Sparkle className="ml-2 inline-block h-6 w-6 -translate-y-6 text-butter sm:h-8 sm:w-8" />
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            烤箱旁邊的小筆記：店裡的故事、在家也能做的甜點訣竅，還有我們為什麼這樣做甜點。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <PostCard post={featured} featured />

        <div className="my-14 border-t-2 border-dashed border-ink/20 sm:my-20" />

        <div className="grid gap-14 sm:grid-cols-2 sm:gap-8 lg:gap-12">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <p className="mt-20 mb-16 text-xs leading-relaxed text-ink/45">
          照片來源 Wikimedia Commons：
          {posts.map(({ credit }, i) => (
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
    </main>
  );
}
