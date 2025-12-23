interface CarouselProps {
  className?: string;
}

export function Carousel({ className = 'size-4' }: CarouselProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.44422 13.5555H9.55533C10.5376 13.5555 11.3331 12.76 11.3331 11.7778V4.22221C11.3331 3.23998 10.5376 2.44443 9.55533 2.44443H6.44422C5.462 2.44443 4.66644 3.23998 4.66644 4.22221V11.7778C4.66644 12.76 5.462 13.5555 6.44422 13.5555Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.0376 3.84764C1.5016 4.02062 1.11084 4.51777 1.11084 5.11111V10.8889C1.11084 11.4822 1.5016 11.9794 2.0376 12.1524"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.962 3.84764C14.498 4.02062 14.8887 4.51777 14.8887 5.11111V10.8889C14.8887 11.4822 14.498 11.9794 13.962 12.1524"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </svg>
  );
}
