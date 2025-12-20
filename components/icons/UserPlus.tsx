interface UserPlusProps {
  className?: string;
}

export function UserPlus({ className = 'size-4' }: UserPlusProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.99996 6.44486C9.35 6.44486 10.4444 5.35064 10.4444 4.00041C10.4444 2.65019 9.35 1.55597 7.99996 1.55597C6.64991 1.55597 5.55551 2.65019 5.55551 4.00041C5.55551 5.35064 6.64991 6.44486 7.99996 6.44486Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M15.3333 13.1116H10.8889" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.1111 10.8893V15.3338" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M10.859 9.49067C10.0224 8.97956 9.05231 8.66711 7.99995 8.66711C5.73239 8.66711 3.7875 10.0271 2.92528 11.9738C2.60084 12.7071 3.00261 13.5506 3.76706 13.7915C4.85595 14.1346 6.29675 14.444 7.99995 14.444C8.19844 14.444 8.38244 14.4284 8.57239 14.419"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
