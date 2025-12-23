interface FilterTunelProps {
  className?: string;
}

export function FilterTunel({ className = 'size-4' }: FilterTunelProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33335 13.1111L6.66668 14.4444V8L2.44446 2.44444H13.5556L9.33335 8V13.1111Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
