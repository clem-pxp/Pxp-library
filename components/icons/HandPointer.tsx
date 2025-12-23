interface HandPointerProps {
  className?: string;
}

export function HandPointer({ className = 'size-4' }: HandPointerProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.55529 6.88803C9.55529 6.27469 9.05396 5.77692 8.44418 5.77692C7.8344 5.77692 7.33307 6.27469 7.33307 6.88803"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.7775 7.33247C11.7775 6.71914 11.2762 6.22136 10.6664 6.22136C10.1673 6.22136 9.66943 6.52287 9.5553 6.88803"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33343 6.88802V2.6658C7.33343 2.05247 6.8321 1.55469 6.22232 1.55469C5.61254 1.55469 5.11121 2.05247 5.11121 2.6658V9.52358L3.53965 7.5218C3.16099 7.03913 2.45965 6.95735 1.97965 7.33424C1.49965 7.71113 1.44277 8.33958 1.7921 8.89424L3.53432 11.5734C4.51832 13.0871 6.20099 14 8.00543 14H9.55654C12.0108 14 14.001 12.0098 14.001 9.55558V7.77691C14.001 7.16358 13.4997 6.6658 12.8899 6.6658C12.3815 6.6658 11.9914 6.88802 11.7779 7.33246"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
