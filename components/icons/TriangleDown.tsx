interface TriangleDownProps {
  className?: string;
}

export function TriangleDown({ className = 'size-4' }: TriangleDownProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.37673 6.75194C5.18233 6.41861 5.42273 6 5.80863 6L10.1926 6C10.5785 6 10.8189 6.41861 10.6245 6.75194L8.43252 10.5096C8.23958 10.8404 7.76168 10.8404 7.56874 10.5096L5.37673 6.75194Z"
        fill="currentColor"
      />
    </svg>
  );
}
