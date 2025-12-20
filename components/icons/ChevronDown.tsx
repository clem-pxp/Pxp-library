interface ChevronDownProps {
  className?: string;
}

export function ChevronDown({
  className = "size-2",
}: ChevronDownProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.73199 1.80777L4.16801 4.37174L1.60404 1.80777C1.34633 1.55005 0.930011 1.55005 0.672293 1.80777C0.414574 2.06549 0.414574 2.48181 0.672293 2.73952L3.70543 5.77267C3.96316 6.03038 4.37947 6.03038 4.63719 5.77267L7.67033 2.73952C7.92805 2.48181 7.92805 2.06549 7.67033 1.80777C7.4126 1.55666 6.98971 1.55005 6.73199 1.80777Z"
        fill="currentColor"
      />
    </svg>
  );
}
