interface H1Props {
  className?: string;
}

export function H1({ className = 'size-4' }: H1Props) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.64718 13V12.0245L3.70363 11.8573V8.68562H7.29637V11.8573L6.35282 12.0245V13H10V12.0245L9.05645 11.8573V4.14828L10 3.98106V3H6.35282V3.98106L7.29637 4.14828V7.43143H3.70363V4.14828L4.64718 3.98106V3H1V3.98106L1.9375 4.14828V11.8573L1 12.0245V13H4.64718Z"
        fill="currentColor"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M14.9852 13V12.1552L13.9179 12.0234V7L11.4 7.42033V8.21978L12.4755 8.23214V12.0234L11.4082 12.1552V13H14.9852Z" fill="currentColor" />
    </svg>
  );
}
