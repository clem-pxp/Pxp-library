interface SearchProps {
  className?: string;
}

export function Search({ className = 'size-4' }: SearchProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.92969 8.92731L12.544 12.5416" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M5.83398 10.2083C8.25023 10.2083 10.209 8.24959 10.209 5.83334C10.209 3.4171 8.25023 1.45834 5.83398 1.45834C3.41774 1.45834 1.45898 3.4171 1.45898 5.83334C1.45898 8.24959 3.41774 10.2083 5.83398 10.2083Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
