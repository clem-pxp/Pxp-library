interface UserCrossProps {
  className?: string;
}

export function UserCross({ className = 'size-4' }: UserCrossProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99999 6.44486C9.35003 6.44486 10.4444 5.35046 10.4444 4.00041C10.4444 2.65037 9.35003 1.55597 7.99999 1.55597C6.64994 1.55597 5.55554 2.65037 5.55554 4.00041C5.55554 5.35046 6.64994 6.44486 7.99999 6.44486Z"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.6666 10.6671L14.2222 14.2227" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.82901 8.74239C8.55844 8.69795 8.28359 8.66711 7.99995 8.66711C5.73239 8.66711 3.7875 10.0271 2.92528 11.9738C2.60084 12.7071 3.00261 13.5506 3.76706 13.7915C4.85595 14.1346 6.29675 14.444 7.99995 14.444C8.00786 14.444 8.01496 14.4429 8.02287 14.4429"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.2222 10.6671L10.6666 14.2227" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
