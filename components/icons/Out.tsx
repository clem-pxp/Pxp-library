interface OutProps {
  className?: string;
}

export function Out({ className = 'size-4' }: OutProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.75 5.5L15.25 9M15.25 9L11.75 12.5M15.25 9H7.75M8.25 2.75H4.75C3.645 2.75 2.75 3.645 2.75 4.75V13.25C2.75 14.355 3.645 15.25 4.75 15.25H8.25"
        stroke="currentColor"
        strokeWidth="1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
