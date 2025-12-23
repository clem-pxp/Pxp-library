interface ImageProps {
  className?: string;
}

export function Image({ className = 'size-4' }: ImageProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.55542 13.1111L8.74298 7.92356C9.4372 7.22934 10.5625 7.22934 11.2568 7.92356L14.4443 11.1111" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M3.33322 13.1111L12.6666 13.1111C13.6484 13.1111 14.4443 12.3152 14.4443 11.3333L14.4443 4.66667C14.4443 3.68483 13.6484 2.88889 12.6666 2.88889L3.33322 2.88889C2.35139 2.88889 1.55545 3.68483 1.55545 4.66667L1.55545 11.3333C1.55545 12.3152 2.35139 13.1111 3.33322 13.1111Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.11099 7.55555C5.72464 7.55555 6.2221 7.05809 6.2221 6.44444C6.2221 5.83079 5.72464 5.33333 5.11099 5.33333C4.49734 5.33333 3.99988 5.83079 3.99988 6.44444C3.99988 7.05809 4.49734 7.55555 5.11099 7.55555Z"
          fill="currentColor"
        />
    </svg>
  );
}
