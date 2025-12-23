interface SectionProps {
  className?: string;
}

export function Section({ className = 'size-4' }: SectionProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.55542 6.88889L1.55542 9.11111C1.55542 10.0929 2.35136 10.8889 3.3332 10.8889H12.6665C13.6484 10.8889 14.4443 10.0929 14.4443 9.11111V6.88889C14.4443 5.90705 13.6484 5.11111 12.6665 5.11111L3.3332 5.11111C2.35136 5.11111 1.55542 5.90705 1.55542 6.88889Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.33325 14H12.6666" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.33325 2H12.6666" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
