interface ArrowUpProps {
  className?: string;
}

export function ArrowUp({ className = "size-4" }: ArrowUpProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
