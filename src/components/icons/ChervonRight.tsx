export default function ChervonRight({ className, style, width = 24, height = 24 }: BaseIconProps) {
  return (
    <svg
      style={style}
      className={className}
      focusable="false"
      aria-hidden="true"
      height={width}
      width={height}
      fill="currentColor"
      viewBox="0 0 24 24">
      <path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path>
      <path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path>
    </svg>
  );
}
