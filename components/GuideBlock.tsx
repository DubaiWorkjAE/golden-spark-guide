import { depthRange, productsFor, sectionVideo, type SectionText } from "@/lib/data";
import { messages, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";
import ProductCard from "./ProductCard";
import VideoPlayer from "./VideoPlayer";

export type Tone = "white" | "mist" | "navy";

const tones = {
  white: {
    bg: "bg-white",
    title: "text-navy",
    callout: "bg-gold/10 text-ink",
    rule: "divide-black/10 border-black/10",
    label: "text-muted",
    value: "text-ink",
    body: "text-muted",
    nudge: "text-navy ring-navy/20 hover:bg-mist",
  },
  mist: {
    bg: "bg-mist",
    title: "text-navy",
    callout: "bg-gold/15 text-ink",
    rule: "divide-black/10 border-black/10",
    label: "text-muted",
    value: "text-ink",
    body: "text-muted",
    nudge: "text-navy ring-navy/20 hover:bg-white",
  },
  navy: {
    bg: "bg-navy",
    title: "text-white",
    callout: "bg-white/[0.07] text-white",
    rule: "divide-white/15 border-white/15",
    label: "text-white/60",
    value: "text-white",
    body: "text-white/70",
    nudge: "text-white ring-white/30 hover:bg-white/10",
  },
};

// **bold** in the JSON texts becomes <strong>.
function rich(text: string) {
  return text.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

type Props = { id: string; text: SectionText; tone: Tone; withVideo: boolean; showReviewBadge: boolean };

export default function GuideBlock({ id, text, tone, withVideo, showReviewBadge }: Props) {
  const t = tones[tone];
  const products = productsFor(id);
  const depth = depthRange(products);

  return (
    <section id={text.anchor} aria-labelledby={`${id}-title`} className={t.bg}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-24">
        <div className={withVideo ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-x-20" : "grid max-w-3xl gap-8"}>
          <div>
            <h3 id={`${id}-title`} className={`text-3xl font-semibold tracking-tight sm:text-5xl ${t.title}`}>
              {text.title}
            </h3>
            <p className={`mt-5 rounded-2xl border-s-4 border-gold px-5 py-4 text-lg leading-snug ${t.callout}`}>
              {rich(text.callout)}
            </p>
          </div>

          {withVideo && (
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <VideoPlayer video={sectionVideo(id)} label={text.title} />
            </div>
          )}

          <div>
            <dl className={`divide-y border-y ${t.rule}`}>
              <Fact label="What it finds" value={text.finds} t={t} />
              {depth && (
                <Fact
                  label={text.neutral ? "Depth (manufacturer states)" : "Max depth (manufacturer claim)"}
                  value={text.neutral ? `Up to ${depth}` : depth}
                  t={t}
                />
              )}
              <Fact label="Best for" value={text.bestFor} t={t} />
            </dl>
            <p className={`mt-6 text-[17px] leading-relaxed ${t.body}`}>{text.explanation}</p>
            {showReviewBadge && text.review && (
              <p className="mt-4 inline-flex items-center rounded-full border border-dashed border-amber-500/70 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                Draft text · needs your review
              </p>
            )}
          </div>
        </div>

        {products.length > 0 && (
          <ul className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory scroll-ps-4 gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:scroll-ps-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {products.map((product) => (
              <li key={product.slug} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
                <ProductCard product={product} neutral={text.neutral} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href={whatsappLink(messages.section(text.title))}
            target="_blank"
            rel="noopener"
            className={`inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-semibold ring-1 transition ${t.nudge}`}
          >
            <WhatsAppIcon className="size-5" />
            Not sure? Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value, t }: { label: string; value: string; t: (typeof tones)[Tone] }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5 sm:grid-cols-[11rem_1fr]">
      <dt className={`text-sm ${t.label}`}>{label}</dt>
      <dd className={`text-[15px] font-medium ${t.value}`}>{value}</dd>
    </div>
  );
}
