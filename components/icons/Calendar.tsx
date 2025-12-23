interface CalendarProps {
  className?: string;
}

export function Calendar({ className = 'size-4' }: CalendarProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.11108 2.44446V0.666687" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.8889 2.44446V0.666687" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.2222 2.44446H3.77778C2.79594 2.44446 2 3.2404 2 4.22224V11.7778C2 12.7596 2.79594 13.5556 3.77778 13.5556H12.2222C13.2041 13.5556 14 12.7596 14 11.7778V4.22224C14 3.2404 13.2041 2.44446 12.2222 2.44446Z"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 5.55554H14" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
