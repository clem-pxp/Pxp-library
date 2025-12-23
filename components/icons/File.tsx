interface FileProps {
  className?: string;
}

export function File({ className = 'size-4' }: FileProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.44454 10.4445H5.11121" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.11121 8H5.11121" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.889 5.55554H5.11121" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.22224 2.44446H11.7778C12.7597 2.44446 13.5556 3.24037 13.5556 4.22224V8.81921C13.5556 9.29068 13.3683 9.74286 13.0349 10.0763L10.0763 13.0349C9.74286 13.3683 9.29068 13.5556 8.81921 13.5556H4.22224C3.24037 13.5556 2.44446 12.7597 2.44446 11.7778V4.22224C2.44446 3.24037 3.24037 2.44446 4.22224 2.44446Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.11121 13.4649V10C9.11121 9.50934 9.50943 9.11111 10.0001 9.11111H13.4757" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
