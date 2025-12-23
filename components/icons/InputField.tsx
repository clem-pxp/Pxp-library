interface InputFieldProps {
  className?: string;
}

export function InputField({ className = 'size-4' }: InputFieldProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.55542 11.7778H3.3332C2.35098 11.7778 1.55542 10.9822 1.55542 10V6.00002C1.55542 5.0178 2.35098 4.22224 3.3332 4.22224H9.55542"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.222 4.22224H12.6665C13.6487 4.22224 14.4443 5.0178 14.4443 6.00002V10C14.4443 10.9822 13.6487 11.7778 12.6665 11.7778H12.222"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.55542 3.33334V12.6667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.77771 1.55557C8.75993 1.55557 9.55549 2.35113 9.55549 3.33335" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.3332 1.55557C10.351 1.55557 9.55542 2.35113 9.55542 3.33335" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.77771 14.4445C8.75993 14.4445 9.55549 13.6489 9.55549 12.6667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.3332 14.4445C10.351 14.4445 9.55542 13.6489 9.55542 12.6667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.22205 8.66669H10.8887" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
