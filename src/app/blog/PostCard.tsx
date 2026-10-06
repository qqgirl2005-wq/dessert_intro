import Image from "next/image";
import Link from "next/link";
import { formatDate, type Post } from "./posts";

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-ink/60">
      <span className="rounded-full bg-ink px-3 py-1 text-paper">{post.category}</span>
      <time dateTime={post.date} className="font-display tabular-nums">
        {formatDate(post.date)}
      </time>
      <span aria-hidden>·</span>
      <span>閱讀約 {post.readMinutes} 分鐘</span>
    </p>
  );
}

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid items-center gap-6 ${featured ? "md:grid-cols-[1.15fr_1fr] md:gap-10" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-[2rem] p-2 ${post.tint} ${featured ? "aspect-[4/3]" : "aspect-[5/4]"}`}>
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            sizes={featured ? "(min-width: 768px) 560px, 92vw" : "(min-width: 640px) 45vw, 92vw"}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </div>
      <div>
        <PostMeta post={post} />
        <h2 className={`mt-4 leading-snug transition group-hover:text-berry ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {post.title}
        </h2>
        <p className="font-display mt-1 text-sm italic text-berry-dark">{post.en}</p>
        <p className={`mt-4 leading-relaxed text-ink/70 ${featured ? "" : "text-sm"}`}>{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm">
          <span className="underline decoration-berry decoration-2 underline-offset-8">閱讀全文</span>
          <span className="transition group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
