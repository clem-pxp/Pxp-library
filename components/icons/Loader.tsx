interface LoaderProps {
  className?: string;
}

export function Loader({ className = 'size-4' }: LoaderProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.99985 3.33335C8.49077 3.33335 8.88874 2.93538 8.88874 2.44446C8.88874 1.95354 8.49077 1.55557 7.99985 1.55557C7.50893 1.55557 7.11096 1.95354 7.11096 2.44446C7.11096 2.93538 7.50893 3.33335 7.99985 3.33335Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.75"
        d="M13.5555 8.88891C14.0464 8.88891 14.4443 8.49094 14.4443 8.00002C14.4443 7.5091 14.0464 7.11113 13.5555 7.11113C13.0645 7.11113 12.6666 7.5091 12.6666 8.00002C12.6666 8.49094 13.0645 8.88891 13.5555 8.88891Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.5"
        d="M7.99985 14.4445C8.49077 14.4445 8.88874 14.0465 8.88874 13.5556C8.88874 13.0647 8.49077 12.6667 7.99985 12.6667C7.50893 12.6667 7.11096 13.0647 7.11096 13.5556C7.11096 14.0465 7.50893 14.4445 7.99985 14.4445Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.25"
        d="M2.44431 8.88891C2.93523 8.88891 3.3332 8.49094 3.3332 8.00002C3.3332 7.5091 2.93523 7.11113 2.44431 7.11113C1.95339 7.11113 1.55542 7.5091 1.55542 8.00002C1.55542 8.49094 1.95339 8.88891 2.44431 8.88891Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.88"
        d="M11.9283 4.96058C12.4192 4.96058 12.8171 4.56261 12.8171 4.07169C12.8171 3.58077 12.4192 3.1828 11.9283 3.1828C11.4373 3.1828 11.0394 3.58077 11.0394 4.07169C11.0394 4.56261 11.4373 4.96058 11.9283 4.96058Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.63"
        d="M11.9283 12.8172C12.4192 12.8172 12.8171 12.4193 12.8171 11.9283C12.8171 11.4374 12.4192 11.0395 11.9283 11.0395C11.4373 11.0395 11.0394 11.4374 11.0394 11.9283C11.0394 12.4193 11.4373 12.8172 11.9283 12.8172Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.38"
        d="M4.07151 12.8172C4.56243 12.8172 4.96039 12.4193 4.96039 11.9283C4.96039 11.4374 4.56243 11.0395 4.07151 11.0395C3.58059 11.0395 3.18262 11.4374 3.18262 11.9283C3.18262 12.4193 3.58059 12.8172 4.07151 12.8172Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.13"
        d="M4.07151 4.96058C4.56243 4.96058 4.96039 4.56261 4.96039 4.07169C4.96039 3.58077 4.56243 3.1828 4.07151 3.1828C3.58059 3.1828 3.18262 3.58077 3.18262 4.07169C3.18262 4.56261 3.58059 4.96058 4.07151 4.96058Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
