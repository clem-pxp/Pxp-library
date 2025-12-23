interface TagProps {
  className?: string;
}

export function Tag({ className = 'size-4' }: TagProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.88889 2H7.264C7.73511 2 8.18756 2.18756 8.52089 2.52089L13.632 7.632C14.3262 8.32622 14.3262 9.45156 13.632 10.1458L10.1458 13.632C9.45156 14.3262 8.32622 14.3262 7.632 13.632L2.52089 8.52089C2.18756 8.18756 2 7.73511 2 7.264V2.88889C2 2.39822 2.39822 2 2.88889 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.55557 6.66667C6.16922 6.66667 6.66668 6.1692 6.66668 5.55555C6.66668 4.9419 6.16922 4.44444 5.55557 4.44444C4.94192 4.44444 4.44446 4.9419 4.44446 5.55555C4.44446 6.1692 4.94192 6.66667 5.55557 6.66667Z"
        fill="currentColor"
      />
    </svg>
  );
}
