interface VaultProps {
  className?: string;
}

export function Vault({ className = 'size-4' }: VaultProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.00072 10.7273C9.50692 10.7273 10.728 9.50628 10.728 8.00008C10.728 6.49384 9.50692 5.2728 8.00072 5.2728C6.49448 5.2728 5.27344 6.49384 5.27344 8.00008C5.27344 9.50628 6.49448 10.7273 8.00072 10.7273Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.09071 8H8.18164" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.3333 2H4.66667C3.19391 2 2 3.19391 2 4.66667V11.3333C2 12.8061 3.19391 14 4.66667 14H11.3333C12.8061 14 14 12.8061 14 11.3333V4.66667C14 3.19391 12.8061 2 11.3333 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
