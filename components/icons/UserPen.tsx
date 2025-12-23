interface UserPenProps {
  className?: string;
}

export function UserPen({ className = 'size-4' }: UserPenProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00005 6.44486C9.35027 6.44486 10.4445 5.35046 10.4445 4.00041C10.4445 2.65037 9.35027 1.55597 8.00005 1.55597C6.64983 1.55597 5.5556 2.65037 5.5556 4.00041C5.5556 5.35046 6.64983 6.44486 8.00005 6.44486Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.55057 8.90081C9.05857 8.75386 8.54071 8.66711 8.00008 8.66711C5.73253 8.66711 3.78762 10.0271 2.9254 11.9738C2.60096 12.7071 3.00275 13.5506 3.7672 13.7915C4.47768 14.0158 5.35021 14.2153 6.33768 14.3323"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3742 14.4037L14.1841 11.5938C14.5313 11.2467 14.5313 10.6838 14.1841 10.3367L13.6634 9.816C13.3163 9.46889 12.7535 9.46889 12.4064 9.816L9.59642 12.626L8.88904 15.1112L11.3742 14.4037Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
