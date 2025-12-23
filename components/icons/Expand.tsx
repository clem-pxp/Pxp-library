interface ExpandProps {
  className?: string;
}

export function Expand({ className = 'size-4' }: ExpandProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.1109 5.55545L7.99978 2.44434L4.88867 5.55545" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.1109 10.4443L7.99978 13.5554L4.88867 10.4443" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
