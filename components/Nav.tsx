"use client";

import Image from "next/image";
import { useState } from "react";
import { messages, whatsappLink } from "@/lib/site";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#levels", label: "Your level" },
  { href: "#specialty", label: "Specialty" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight text-navy">
          <Image src="/brand/shield.png" alt="" width={29} height={28} priority />
          <span>
            Golden Spark <span className="hidden font-normal text-muted sm:inline">Detectors</span>
          </span>
        </a>

        <ul className="ms-auto hidden items-center gap-7 text-sm text-ink/80 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition hover:text-navy">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink(messages.general)}
          target="_blank"
          rel="noopener"
          className="ms-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-wa px-4 text-sm font-medium text-white transition hover:bg-wa-hover md:ms-0"
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-ms-3 -me-2 grid size-11 place-items-center text-navy md:hidden"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-black/5 bg-white px-4 pb-3 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-black/5 py-3.5 text-lg text-ink last:border-0"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
