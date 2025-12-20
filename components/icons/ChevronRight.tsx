interface   ChevronRightProps {
  className?: string;
}

export function ChevronRight({ className = 'size-2' }: ChevronRightProps) {
  return (
    <svg className={className} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.01519 1.43506L4.57915 3.99904L2.01519 6.563C1.75747 6.82072 1.75747 7.23704 2.01519 7.49476C2.27291 7.75247 2.68922 7.75247 2.94694 7.49476L5.98008 4.46161C6.2378 4.20389 6.2378 3.78758 5.98008 3.52986L2.94694 0.496721C2.68922 0.238998 2.27291 0.238998 2.01519 0.496721C1.76408 0.754444 1.75747 1.17734 2.01519 1.43506Z"
        fill="currentColor"
      />
    </svg>
  );
}
