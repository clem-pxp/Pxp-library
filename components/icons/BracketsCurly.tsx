interface BracketsCurlyProps {
  className?: string;
}

export function BracketsCurly({ className = 'size-4' }: BracketsCurlyProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3333 14.3333C11.8067 14.3333 13 13.14 13 11.6667V10C13 8.89601 13.896 8.00001 15 8.00001C13.896 8.00001 13 7.10401 13 6.00001V4.33335C13 2.86001 11.8067 1.66668 10.3333 1.66668"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.66667 14.3333C4.19333 14.3333 3 13.14 3 11.6667V10C3 8.896 2.104 8 1 8C2.104 8 3 7.104 3 6V4.33333C3 2.86 4.19333 1.66667 5.66667 1.66667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
