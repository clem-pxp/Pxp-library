interface EaseInOutProps {
  className?: string;
}

export function EaseInOut({ className = 'size-4' }: EaseInOutProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.44446 13.1111C10.6667 13.1111 5.33335 2.88889 13.5556 2.88889" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.33331 3.33333H5.11108" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M3.55556 4.88888C4.41422 4.88888 5.11111 4.19199 5.11111 3.33333C5.11111 2.47466 4.41422 1.77777 3.55556 1.77777C2.69689 1.77777 2 2.47466 2 3.33333C2 4.19199 2.69689 4.88888 3.55556 4.88888Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.66663 12.6667H10.8888" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M12.4445 14.2222C11.5858 14.2222 10.8889 13.5253 10.8889 12.6667C10.8889 11.808 11.5858 11.1111 12.4445 11.1111C13.3031 11.1111 14 11.808 14 12.6667C14 13.5253 13.3031 14.2222 12.4445 14.2222Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
