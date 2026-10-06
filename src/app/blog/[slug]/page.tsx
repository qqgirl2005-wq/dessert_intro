import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkle } from "../../components/Illustrations";
import SectionLabel from "../../components/SectionLabel";
import PostCard, { PostMeta } from "../PostCard";
import { getPost, posts, type Block } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title}｜糖糖甜點屋`,
    description: post.excerpt,
  };
}

function Content({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mt-6 text-[17px] leading-loose text-ink/80">{block.text}</p>;
    case "h2":
      return (
        <h2 className="mt-14 flex items-center gap-3 text-2xl sm:text-3xl">
          <Sparkle className="h-5 w-5 shrink-0 text-berry" />
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="relative my-12 rounded-[2rem] bg-cream px-8 py-10 sm:px-12">
          <span className="font-display absolute -top-6 left-6 text-8xl leading-none text-blush select-none" aria-hidden>
            &ldquo;
          </span>
          <p className="relative text-2xl leading-snug sm:text-3xl">{block.text}</p>
          {block.cite && <footer className="mt-4 text-sm text-ink/60">— {block.cite}</footer>}
        </blockquote>
      );
    case "list": {
      if (block.ordered) {
        return (
          <ol className="mt-6 space-y-3">
            {block.items.map((item, i) => (
              <li key={item} className="grid grid-cols-[2.25rem_1fr] items-baseline gap-2 text-[17px] leading-relaxed text-ink/80">
                <span className="font-display text-xl italic text-berry tabular-nums">0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="mt-6 space-y-2 rounded-[1.5rem] border-2 border-dashed border-ink/20 px-6 py-5">
          {block.items.map((item) => (
            <li key={item} className="flex items-baseline gap-3 text-[17px] leading-relaxed text-ink/80">
              <span className="h-2 w-2 shrink-0 -translate-y-0.5 rounded-full bg-berry" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <main className="flex-1 overflow-x-clip">
      <header className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-16">
        <Link href="/blog" className="group inline-flex items-center gap-2 text-sm text-ink/60 hover:text-berry">
          <span className="transition group-hover:-translate-x-1">←</span>
          回到甜點日記
        </Link>
        <div className="mt-8">
          <PostMeta post={post} />
        </div>
        <h1 className="mt-5 text-4xl leading-snug sm:text-5xl sm:leading-snug">{post.title}</h1>
        <p className="font-display mt-2 text-lg italic text-berry-dark">{post.en}</p>
      </header>

      <figure className="mx-auto mt-10 max-w-5xl px-4 sm:mt-14 sm:px-6">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] p-2 sm:aspect-[16/9] sm:rounded-[2.5rem] ${post.tint}`}>
          <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] sm:rounded-[2rem]">
            <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(min-width: 1024px) 976px, 94vw" className="object-cover" />
          </div>
        </div>
        <figcaption className="mt-3 text-right text-xs text-ink/45">
          Photo:{" "}
          <a href={post.credit.url} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
            {post.credit.author}
          </a>{" "}
          ({post.credit.license}), via Wikimedia Commons
        </figcaption>
      </figure>

      <article className="mx-auto max-w-2xl px-4 pt-6 pb-16 sm:px-6 sm:pb-24">
        {post.body.map((block, i) => (
          <Content key={i} block={block} />
        ))}

        {/* 文末：來店預訂 */}
        <aside className="relative mt-16 rounded-[2rem] bg-butter p-7 sm:p-10">
          <span className="absolute top-1/2 -left-4 h-8 w-8 -translate-y-1/2 rounded-full bg-paper" aria-hidden />
          <span className="absolute top-1/2 -right-4 h-8 w-8 -translate-y-1/2 rounded-full bg-paper" aria-hidden />
          <p className="font-display text-sm italic text-berry-dark">Come taste it</p>
          <p className="mt-2 text-2xl">讀餓了嗎？來店裡吃一塊吧。</p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link href="/#menu" className="rounded-full bg-ink px-6 py-3 text-paper transition hover:bg-berry">
              看今天的甜點 →
            </Link>
            <a href="tel:0212345678" className="text-sm underline decoration-berry decoration-2 underline-offset-8 hover:text-berry">
              電話預訂 02-1234-5678
            </a>
          </div>
        </aside>
      </article>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionLabel no="+" en="Keep Reading" />
          <h2 className="mt-3 text-3xl sm:text-4xl">更多甜點日記</h2>
          <div className="mt-10 grid gap-14 sm:grid-cols-2 sm:gap-8 lg:gap-12">
            {others.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
