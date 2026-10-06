const social = ["Instagram", "LINE", "Facebook"];

export default function Footer() {
  return (
    <footer className="mt-auto">
      <div className="scallop-top" />
      <div className="bg-berry text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-8 sm:grid-cols-2 sm:px-6 sm:pt-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="max-w-xs text-xl leading-snug sm:text-2xl">
              甜點不用很多，
              <br />
              剛好讓你笑一下就好。
            </p>
            <a
              href="tel:0212345678"
              className="mt-6 inline-block rounded-full bg-cream px-5 py-2.5 text-sm text-berry-dark transition hover:bg-ink hover:text-cream"
            >
              電話預訂 02-1234-5678
            </a>
          </div>

          <div className="text-sm">
            <p className="font-display text-xs uppercase tracking-[0.2em] opacity-70">Find us</p>
            <p className="mt-3 leading-relaxed">
              台北市甜甜區糖果路 123 號
              <br />
              週二至週日 11:00 – 20:00
              <br />
              hello@sweetie.example
            </p>
          </div>

          <div className="text-sm">
            <p className="font-display text-xs uppercase tracking-[0.2em] opacity-70">Follow</p>
            <ul className="mt-3 space-y-1.5">
              {social.map((s) => (
                <li key={s}>
                  <a href="#" className="font-display italic underline-offset-4 hover:underline">
                    {s} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden px-4 sm:px-6">
          <p
            className="font-display mx-auto max-w-6xl text-[22vw] leading-[0.8] italic tracking-tight text-cream/95 select-none lg:text-[15rem]"
            aria-hidden
          >
            Sweetie
          </p>
        </div>

        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-cream/30 px-4 py-4 text-xs opacity-80 sm:px-6">
          <span>© 2026 糖糖甜點屋 Sweetie Bakery</span>
          <span className="font-display italic">Baked with love in Taipei</span>
        </div>
      </div>
    </footer>
  );
}
