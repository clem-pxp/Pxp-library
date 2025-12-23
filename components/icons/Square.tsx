interface SquareProps {
  className?: string;
}

export function Square({ className = 'size-4' }: SquareProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.6666 1.66666H4.33329C2.86053 1.66666 1.66663 2.86056 1.66663 4.33332V11.6667C1.66663 13.1394 2.86053 14.3333 4.33329 14.3333H11.6666C13.1394 14.3333 14.3333 13.1394 14.3333 11.6667V4.33332C14.3333 2.86056 13.1394 1.66666 11.6666 1.66666Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
