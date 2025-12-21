interface CubeProps {
  className?: string;
}

export function Cube({ className = 'size-4' }: CubeProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3181 4.91555L7.99986 7.99999L2.68164 4.91555" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 14.1671V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M7.10834 2.07289L3.33056 4.264C2.78211 4.58222 2.44434 5.168 2.44434 5.80177V10.1982C2.44434 10.832 2.78211 11.4178 3.33056 11.736L7.10834 13.9271C7.66034 14.2471 8.34034 14.2471 8.89234 13.9271L12.6701 11.736C13.2186 11.4178 13.5563 10.832 13.5563 10.1982V5.80177C13.5563 5.168 13.2186 4.58222 12.6701 4.264L8.89234 2.07289C8.34034 1.75289 7.66034 1.75289 7.10834 2.07289Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
