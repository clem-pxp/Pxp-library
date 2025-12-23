interface HtmlProps {
  className?: string;
}

export function Html({ className = 'size-4' }: HtmlProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.4446 5.55554L14.4446 3.55554L12.4446 1.55554" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5.35347 2.44446H4.22236C3.24014 2.44446 2.44458 3.2409 2.44458 4.22224V11.7778C2.44458 12.7591 3.24014 13.5556 4.22236 13.5556H11.7779C12.7601 13.5556 13.5557 12.7591 13.5557 11.7778V7.98"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.77795 5.55554L7.77795 3.55554L9.77795 1.55554" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
