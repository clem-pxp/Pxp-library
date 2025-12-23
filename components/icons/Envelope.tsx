interface EnvelopeProps {
  className?: string;
}

export function Envelope({ className = 'size-4' }: EnvelopeProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.55554 5.11108L7.57065 8.42931C7.83821 8.57686 8.16176 8.57686 8.42932 8.42931L14.4444 5.11108"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33335 13.1111L12.6667 13.1111C13.6485 13.1111 14.4445 12.3151 14.4445 11.3333L14.4445 4.66664C14.4445 3.6848 13.6485 2.88886 12.6667 2.88886L3.33335 2.88886C2.35151 2.88886 1.55557 3.6848 1.55557 4.66664L1.55557 11.3333C1.55557 12.3151 2.35151 13.1111 3.33335 13.1111Z"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
