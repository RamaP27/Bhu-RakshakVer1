export function Drone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden>
      <defs>
        <radialGradient id="dg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00f5d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="50" rx="40" ry="6" fill="url(#dg)" opacity="0.6" />
      <g stroke="#00f5d4" strokeWidth="1.4" fill="none">
        <circle cx="20" cy="30" r="10" />
        <circle cx="100" cy="30" r="10" />
        <circle cx="20" cy="55" r="10" />
        <circle cx="100" cy="55" r="10" />
        <line x1="20" y1="30" x2="100" y2="55" />
        <line x1="100" y1="30" x2="20" y2="55" />
      </g>
      <rect x="48" y="36" width="24" height="14" rx="3" fill="#0a2e1a" stroke="#00f5d4" strokeWidth="1.4" />
      <circle cx="60" cy="43" r="2" fill="#00f5d4">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}