import { messages, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(messages.general)}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
      className="fixed end-5 z-50 grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_10px_30px_-8px_rgba(11,127,61,0.7)] ring-4 ring-white/70 transition hover:scale-105 hover:bg-wa-hover"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
