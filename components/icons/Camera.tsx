interface CameraProps {
  className?: string;
}

export function Camera({ className = 'size-4' }: CameraProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.25 5H12L11.493 3.649C11.347 3.259 10.974 3 10.557 3H7.443C7.026 3 6.653 3.259 6.507 3.649L6 5H3.75C2.645 5 1.75 5.895 1.75 7V13.5C1.75 14.605 2.645 15.5 3.75 15.5H14.25C15.355 15.5 16.25 14.605 16.25 13.5V7C16.25 5.895 15.355 5 14.25 5Z"
        stroke="currentColor"
        strokeWidth="1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 13C10.5188 13 11.75 11.7688 11.75 10.25C11.75 8.73122 10.5188 7.5 9 7.5C7.48122 7.5 6.25 8.73122 6.25 10.25C6.25 11.7688 7.48122 13 9 13Z"
        stroke="currentColor"
        strokeWidth="1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.25 8.25C4.66421 8.25 5 7.91421 5 7.5C5 7.08579 4.66421 6.75 4.25 6.75C3.83579 6.75 3.5 7.08579 3.5 7.5C3.5 7.91421 3.83579 8.25 4.25 8.25Z" fill="currentColor" />
    </svg>
  );
}
