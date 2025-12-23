interface TrashProps {
  className?: string;
}

export function Trash({ className = 'size-4' }: TrashProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.44446 4.22217H13.5556" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6 4.22221V2.44443C6 1.95554 6.39822 1.55554 6.88889 1.55554H9.11111C9.60178 1.55554 10 1.95554 10 2.44443V4.22221"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.55554 7.77783L6.7486 11.7778" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.44441 7.77783L9.25134 11.7778" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.1757 6.88892L11.8667 12.7556C11.8169 13.7068 11.0364 14.4445 10.0916 14.4445H5.90937C4.9636 14.4445 4.18403 13.7067 4.13425 12.7556L3.8252 6.88892"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
