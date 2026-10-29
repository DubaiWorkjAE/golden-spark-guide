import Image from "next/image";
import { messages, site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo.png" alt="Golden Spark Detectors" width={112} height={115} />
            <p className="mt-5 max-w-xs text-lg leading-snug text-white/80">
              Still not sure which detector you need? Send us a message.
            </p>
            <a
              href={whatsappLink(messages.general)}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-wa px-6 text-[15px] font-semibold text-white transition hover:bg-wa-hover"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gold">Visit our shop</h2>
            <address className="mt-3 not-italic leading-relaxed text-white/80">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-block py-2 text-sm font-medium text-gold underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gold">Call or email</h2>
            <ul className="mt-3 space-y-1 text-white/80">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="inline-block py-1.5 hover:text-white">
                    <span dir="ltr">{phone.display}</span>{" "}
                    <span className="text-sm text-white/50">({phone.label})</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="inline-block py-1.5 hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.website} className="inline-block py-1.5 hover:text-white">
                  gsdetectors.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50">
          Depth and detection figures are manufacturer claims. Real results depend on the ground, the target and the
          conditions. © {new Date().getFullYear()} {site.name}, Dubai.
        </p>
      </div>
    </footer>
  );
}
