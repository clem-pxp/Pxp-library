"use client";

import { motion } from "motion/react";

interface SideToggleProps {
  className?: string;
  isOpen?: boolean;
}

export function SideToggle({
  className = "size-4",
  isOpen = true,
}: SideToggleProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.25 2C2.45508 2 1 3.45508 1 5.25V10.7499C1 12.5449 2.45508 13.9999 4.25 13.9999H11.75C13.5449 13.9999 15 12.5449 15 10.7499V5.25C15 3.45508 13.5449 2 11.75 2H4.25ZM2.5 10.4999C2.5 11.6045 3.39543 12.4999 4.5 12.4999H11.75C12.7165 12.4999 13.5 11.7164 13.5 10.7499V5.25C13.5 4.28351 12.7165 3.5 11.75 3.5H4.5C3.39543 3.5 2.5 4.39543 2.5 5.5V10.4999Z"
      />
      <rect x="9" y="3" width="1.5" height="10" />
      <motion.rect
        x="10"
        y="3"
        height="10"
        animate={{ width: isOpen ? 4 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </svg>
  );
}
