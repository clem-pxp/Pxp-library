interface ProgressCircleProps {
  className?: string;
}

export function ProgressCircle({ className = 'size-4' }: ProgressCircleProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7005 2.72883C10.9414 2.1946 10.0623 1.82305 9.11121 1.65771" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.344 6.8888C14.1849 5.97413 13.8258 5.09058 13.2703 4.30035" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.2711 11.7004C13.8053 10.9413 14.1769 10.0622 14.3422 9.11108" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.11121 14.3439C10.0259 14.1848 10.9094 13.8257 11.6997 13.2701" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.29956 13.2711C5.05867 13.8053 5.93778 14.1768 6.88889 14.3422" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.65601 9.11108C1.81512 10.0258 2.17423 10.9093 2.72978 11.6995" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.72895 4.2995C2.19473 5.05861 1.82317 5.93772 1.65784 6.88883" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.88886 1.65594C5.97419 1.81506 5.09064 2.17417 4.30042 2.72972" stroke="currentColor" strokeWidth="1.25333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M8.00012 10C9.10469 10 10.0001 9.10457 10.0001 8C10.0001 6.89543 9.10469 6 8.00012 6C6.89555 6 6.00012 6.89543 6.00012 8C6.00012 9.10457 6.89555 10 8.00012 10Z"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
