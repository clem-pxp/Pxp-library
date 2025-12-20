interface ActivityProps {
  className?: string;
}

export function Activity({ className = 'size-4' }: ActivityProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.4444 7.77778H12.4027C12.0275 7.77778 11.6933 8.01333 11.5662 8.36533L10.1022 12.432C9.99554 12.7289 9.57421 12.7236 9.47465 12.4249L6.52532 3.57511C6.42576 3.27644 6.00443 3.27111 5.89776 3.568L4.43376 7.63467C4.30665 7.98756 3.97243 8.22222 3.59732 8.22222H1.55554"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
