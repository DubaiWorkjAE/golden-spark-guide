import Image from "next/image";
import { productImage, productVideo, type Product } from "@/lib/data";
import { messages, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";
import VideoButton from "./VideoButton";

function Depth({ product, neutral }: { product: Product; neutral: boolean }) {
  if (!product.depth) return null;

  if (neutral) {
    return (
      <p className="mt-3 text-sm leading-snug text-ink">
        <span className="text-muted">Manufacturer states:</span> depth up to {product.depth}
        {product.frontRange && <>, forward range up to {product.frontRange}</>}
      </p>
    );
  }

  return (
    <p className="mt-3 text-sm leading-snug">
      <span className="font-medium text-ink">Max depth: {product.depth}</span>{" "}
      <span className="text-muted">(manufacturer claim)</span>
    </p>
  );
}

export default function ProductCard({ product, neutral = false }: { product: Product; neutral?: boolean }) {
  const image = productImage(product);
  const meta = [product.madeIn && `Made in ${product.madeIn}`, product.warranty && `Warranty ${product.warranty}`].filter(
    Boolean,
  );

  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(38,41,72,0.25)] ring-1 ring-black/5 sm:p-5">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
        {image && (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 80vw"
            className="object-contain p-2"
          />
        )}
      </div>

      {product.brand && (
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">{product.brand}</p>
      )}
      <h4 className="mt-1 text-lg font-semibold leading-snug tracking-tight text-navy">{product.name}</h4>
      {meta.length > 0 && <p className="mt-2 text-sm text-muted">{meta.join(" · ")}</p>}
      <Depth product={product} neutral={neutral || Boolean(product.frontRange)} />

      <div className="mt-auto grid gap-2 pt-5">
        <a
          href={whatsappLink(messages.product(product.name))}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-wa px-4 text-[15px] font-semibold text-white transition hover:bg-wa-hover"
        >
          <WhatsAppIcon className="size-5" />
          Learn more on WhatsApp
        </a>
        <VideoButton video={productVideo(product.slug)} title={product.name} />
      </div>
    </article>
  );
}
