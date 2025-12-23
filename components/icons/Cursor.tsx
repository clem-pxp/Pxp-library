interface CursorProps {
  className?: string;
}

export function Cursor({ className = 'size-4' }: CursorProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.30594 7.0425L11.5226 13.9632C11.6582 14.2549 11.3478 14.5528 11.062 14.4055L7.99989 12.8281L4.93776 14.4055C4.65189 14.5528 4.34158 14.2548 4.47714 13.9632L7.69385 7.0425C7.81482 6.78215 8.18496 6.78215 8.30594 7.0425Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3452 11.5573C14.0277 10.5354 14.4444 9.32125 14.4444 8C14.4444 4.44071 11.5592 1.55556 7.99999 1.55556C4.44079 1.55556 1.55554 4.44071 1.55554 8C1.55554 9.32534 1.95874 10.5549 2.64514 11.579"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
