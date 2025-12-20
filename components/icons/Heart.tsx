interface HeartProps {
  className?: string;
}

export function Heart({ className = 'size-4' }: HeartProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.52936 14.512C7.82669 14.6667 8.17336 14.6667 8.4707 14.512C10.0414 13.6934 15 10.724 15 5.89735C15.008 3.77735 13.296 2.05069 11.1734 2.03735C9.89603 2.05335 8.70936 2.69735 8.00003 3.75735C7.28936 2.69735 6.10269 2.05335 4.82669 2.03735C2.70403 2.05069 0.992028 3.77602 1.00003 5.89735C1.00003 10.724 5.96003 13.692 7.52936 14.512Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
