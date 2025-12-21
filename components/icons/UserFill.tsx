interface UserFillProps {
  className?: string;
}

export function UserFill({ className = 'size-4' }: UserFillProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.57502 8C10.6434 8.00003 12.4741 9.33858 13.1014 11.3096L13.9647 14.0225C14.0902 14.4171 13.872 14.8392 13.4774 14.9648C13.0827 15.0903 12.6606 14.8721 12.535 14.4775L11.6717 11.7646C11.2426 10.416 9.99026 9.50003 8.57502 9.5H7.42462C6.00944 9.50011 4.75705 10.4161 4.32795 11.7646L3.46466 14.4775C3.33902 14.8722 2.91695 15.0904 2.52228 14.9648C2.12775 14.8392 1.90945 14.4171 2.03498 14.0225L2.89826 11.3096C3.52547 9.33861 5.35628 8.00011 7.42462 8H8.57502Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1C9.51878 1 10.75 2.23122 10.75 3.75C10.75 5.26878 9.51878 6.5 8 6.5C6.48137 6.49982 5.25 5.26867 5.25 3.75C5.25 2.23133 6.48137 1.00018 8 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
