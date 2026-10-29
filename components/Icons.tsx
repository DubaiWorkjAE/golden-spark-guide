type IconProps = { className?: string };

const base = { "aria-hidden": true, focusable: false } as const;

export function WhatsAppIcon({ className = "size-5" }: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Z" />
      <path d="M8.6 7.2c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.2.3 0 .6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.8-.2 1.5-.3.7-1.6 1.4-2.2 1.4-.6.1-1.2.3-4-1-3.3-1.5-5.3-4.9-5.5-5.2-.2-.2-1.3-1.7-1.3-3.3s.8-2.3 1.1-2.7c.3-.3.6-.4.8-.4h.2Z" />
    </svg>
  );
}

function Stroke({ className = "size-5", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      {...base}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export const ArrowIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Stroke>
);

export const CheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Stroke>
);

export const MenuIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
);

export const CloseIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Stroke>
);

export const PlayIcon = ({ className = "size-6" }: IconProps) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const SoundOnIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
  </Stroke>
);

export const SoundOffIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </Stroke>
);

export const VideoSoonIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="6" width="13" height="12" rx="2.5" />
    <path d="m16 10.5 5-3v9l-5-3" />
  </Stroke>
);

// Hero choice-card icons
const heroIcons: Record<string, React.ReactNode> = {
  coin: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5.5" />
      <path d="M12 9.5v5" />
    </>
  ),
  nugget: <path d="M7.5 6.5 13 4l5 3.5 1.5 6-4 5.5-7 1-3.5-5 1-5.5 1.5-2.5ZM9 10l3-1.5 2.5 2" />,
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

export function HeroIcon({ name, className }: IconProps & { name: string }) {
  return <Stroke className={className}>{heroIcons[name] ?? heroIcons.coin}</Stroke>;
}
