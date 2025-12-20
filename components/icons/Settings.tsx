interface SettingsProps {
  className?: string;
}

export function Settings({ className = 'size-4' }: SettingsProps) {
  return (
    <svg className={className} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 4.237L9 9" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.25 13.764L9 9" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9H9" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9 14.5C12.0376 14.5 14.5 12.0376 14.5 9C14.5 5.96243 12.0376 3.5 9 3.5C5.96243 3.5 3.5 5.96243 3.5 9C3.5 12.0376 5.96243 14.5 9 14.5Z"
        stroke="currentColor"
        strokeWidth="1.41"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 1.75V3.5" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.72095 5.375L4.23695 6.25" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.75 9H3.5" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.25 9H14.5" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.72095 12.625L4.23695 11.75" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 16.25V14.5" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.625 15.279L11.75 13.763" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.375 15.279L6.25 13.763" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.2789 12.625L13.7629 11.75" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.2789 5.375L13.7629 6.25" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.625 2.72101L11.75 4.23701" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.375 2.72101L6.25 4.23701" stroke="currentColor" strokeWidth="1.41" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
