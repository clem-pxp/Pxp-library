interface UserProps {
  className?: string;
}

export function User({ className = 'size-4' }: UserProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00002 5.6547C9.28868 5.6547 10.3334 4.61003 10.3334 3.32137C10.3334 2.03271 9.28868 0.988037 8.00002 0.988037C6.71136 0.988037 5.66669 2.03271 5.66669 3.32137C5.66669 4.61003 6.71136 5.6547 8.00002 5.6547Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5667 13.944C13.3014 13.604 13.5787 12.7173 13.1774 12.016C12.1467 10.2173 10.224 9 8.00135 9C5.77869 9 3.85469 10.216 2.82535 12.016C2.42402 12.7173 2.70135 13.6053 3.43602 13.944C6.48002 15.352 9.52269 15.352 12.5667 13.944Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
