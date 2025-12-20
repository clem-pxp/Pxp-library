interface ButtonCursorProps {
  className?: string;
}

export function ButtonCursor({ className = 'size-4' }: ButtonCursorProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.4443 8.44445V11.1111C14.4443 12.4612 13.3499 13.5556 11.9999 13.5556H3.99986C2.64982 13.5556 1.55542 12.4612 1.55542 11.1111V8.44445"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.22317 6.42881L12.5032 4.49957C12.7257 4.41832 12.7192 4.10143 12.4937 4.02926L10.0772 3.25601L9.30397 0.839567C9.23179 0.613967 8.9149 0.607567 8.83365 0.830056L6.90441 6.11006C6.83188 6.30872 7.0245 6.50143 7.22317 6.42881Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.24093 6H3.99986C2.64982 6 1.55542 7.0944 1.55542 8.44445C1.55542 9.79449 2.64982 10.8889 3.99986 10.8889H11.9999C13.3499 10.8889 14.4443 9.79449 14.4443 8.44445C14.4443 7.81903 14.2025 7.25476 13.8161 6.82249"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
