interface MouseScrollProps {
  className?: string;
}

export function MouseScroll({ className = 'size-4' }: MouseScrollProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5555 9.55554V13.5555" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.7778 11.7778L13.5556 13.5555L15.3334 11.7778" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5555 6.44443V2.44443" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.7778 4.22221L13.5556 2.44443L15.3334 4.22221" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.44444 2.44444H4.66667C3.19391 2.44444 2 3.63835 2 5.11111V10.8889C2 12.3616 3.19391 13.5556 4.66667 13.5556H6.44444C7.9172 13.5556 9.11111 12.3616 9.11111 10.8889V5.11111C9.11111 3.63835 7.9172 2.44444 6.44444 2.44444Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.55554 5.55554V7.77776" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
