import { content } from "@/lib/data";
import { ArrowIcon, CheckIcon, HeroIcon } from "./Icons";

export default function Hero() {
  const { hero } = content;

  return (
    <section id="top" className="relative overflow-hidden bg-navy-deep text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-64 left-1/2 h-[480px] w-[960px] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20 lg:pb-24 lg:pt-28">
        <p className="text-sm font-medium tracking-wide text-gold">{hero.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-snug text-white/75 sm:text-xl">{hero.subtitle}</p>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {hero.cards.map((card) => (
            <li key={card.href}>
              <a
                href={card.href}
                className="group flex h-full flex-col rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.1] hover:ring-gold/40 sm:p-6"
              >
                <HeroIcon name={card.icon} className="size-8 text-gold sm:size-10" />
                <span className="mt-4 text-base font-semibold leading-tight sm:text-xl">{card.title}</span>
                <span className="mt-1.5 text-sm leading-snug text-white/70">{card.text}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-gold">
                  Show me
                  <ArrowIcon className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-white/70">
          {hero.trust.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckIcon className="size-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
