export default function ChervonLeftIcon({ width = 24, height = 24, className, style }: BaseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.42001 12.99L16.59 12.99L11.71 17.87C11.32 18.26 11.32 18.9 11.71 19.29C12.1 19.68 12.73 19.68 13.12 19.29L19.71 12.7C20.1 12.31 20.1 11.68 19.71 11.29L13.12 4.7C12.73 4.31 12.1 4.31 11.71 4.7C11.32 5.09 11.32 5.72001 11.71 6.11001L16.59 10.99L5.42001 10.99C4.87001 10.99 4.42001 11.44 4.42001 11.99C4.42001 12.54 4.87001 12.99 5.42001 12.99Z"
        fill="currentColor"
      />
    </svg>
  );
}
