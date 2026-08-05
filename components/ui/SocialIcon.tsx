const iconShared = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  fill: "none",
};

/**
 * Keyed by the language-invariant platform id, not a (translated) label —
 * a label switch would silently drop every icon once translated.
 */
export function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  switch (platform) {
    case "email":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="1.5" y="3.5" width="13" height="9" {...iconShared} />
          <path d="M1.5 4l6.5 5 6.5-5" {...iconShared} />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <circle cx="8" cy="8" r="3.2" {...iconShared} />
          <circle cx="11.4" cy="4.6" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <circle cx="5.5" cy="5.6" r="0.9" fill="currentColor" stroke="none" />
          <path d="M5.5 7.6v4.4" {...iconShared} />
          <path d="M8.4 12v-2.6c0-1.3.9-1.8 1.8-1.8s1.8.5 1.8 1.8V12" {...iconShared} />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <path d="M6 5h3.4v1.2H7.4v1.4H9v1.2H7.4V12H6z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <path
            d="M4.2 5l3 4.1L4.4 11h1l2.3-1.8L9.6 11h2.2L8.6 6.7 11.4 5h-1L8.3 6.6 6.4 5z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <circle cx="6.1" cy="10.3" r="1.6" {...iconShared} />
          <path d="M7.7 10.3v-7c.3 1.6 1.6 2.8 3.2 3v1.3" {...iconShared} />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 16 16" className={className} aria-hidden>
          <rect x="2" y="2" width="12" height="12" {...iconShared} />
          <path d="M6.6 5.6l4 2.4-4 2.4z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
