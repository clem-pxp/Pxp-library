interface ArrowDownProps {
  className?: string;
}

export function ArrowDown({ className = "size-4" }: ArrowDownProps) {
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
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}
