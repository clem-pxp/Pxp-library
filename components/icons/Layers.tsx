interface LayersProps {
  className?: string;
}

export function Layers({ className = 'size-4' }: LayersProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.36918 4.52094L7.58607 1.77338C7.84563 1.63649 8.15496 1.63649 8.41452 1.77338L13.6323 4.52094C14.107 4.77072 14.107 5.45072 13.6323 5.70049L8.41452 8.44805C8.15496 8.58494 7.84563 8.58494 7.58607 8.44805L2.36918 5.70138C1.89452 5.4516 1.89452 4.77072 2.36918 4.52094Z"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9876 8.00003C13.9876 8.23203 13.8685 8.46492 13.6312 8.59025L8.41341 11.3378C8.15385 11.4747 7.84452 11.4747 7.58496 11.3378L2.36719 8.59025C2.12985 8.46492 2.01074 8.23292 2.01074 8.00003"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.9876 10.8889C13.9876 11.1209 13.8685 11.3538 13.6312 11.4791L8.41341 14.2267C8.15385 14.3636 7.84452 14.3636 7.58496 14.2267L2.36719 11.4791C2.12985 11.3538 2.01074 11.1218 2.01074 10.8889"
        stroke="currentColor"
        strokeWidth="1.25333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
