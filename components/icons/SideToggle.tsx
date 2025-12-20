interface SideToggleProps {
  className?: string;
}

export function SideToggle({ className = 'size-4' }: SideToggleProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.625" y="2.625" width="12.75" height="10.75" rx="2.375" stroke="currentColor" strokeWidth="1.25" />
      <rect x="5" y="3" width="1.25" height="10" fill="currentColor" />
    </svg>
  );
}
