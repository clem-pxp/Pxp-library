interface MapProps {
  className?: string;
}

export function Map({ className = 'size-4' }: MapProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.55542 2.48176V11.8151" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.4443 4.18489V13.5182" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M2.25154 3.17867L5.30221 2.50045C5.46754 2.464 5.63999 2.47467 5.7991 2.53245L10.2009 4.13334C10.36 4.19111 10.5324 4.20267 10.6978 4.16533L13.3627 3.57334C13.9182 3.44978 14.4444 3.872 14.4444 4.44089V11.9538C14.4444 12.3707 14.1547 12.7316 13.7484 12.8213L10.6978 13.4996C10.5324 13.536 10.36 13.5253 10.2009 13.4676L5.7991 11.8667C5.63999 11.8089 5.46754 11.7973 5.30221 11.8347L2.63732 12.4267C2.08176 12.5502 1.55554 12.128 1.55554 11.5591V4.04622C1.55554 3.62934 1.84532 3.26845 2.25154 3.17867Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
