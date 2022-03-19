export default function NextArrowIcon({ width = 24, height = 24, className, style }: BaseIconProps) {
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
        d="M5.42001 11H16.59L11.71 6.12C11.32 5.73 11.32 5.09 11.71 4.7C12.1 4.31 12.73 4.31 13.12 4.7L19.71 11.29C20.1 11.68 20.1 12.31 19.71 12.7L13.12 19.29C12.73 19.68 12.1 19.68 11.71 19.29C11.32 18.9 11.32 18.27 11.71 17.88L16.59 13H5.42001C4.87001 13 4.42001 12.55 4.42001 12C4.42001 11.45 4.87001 11 5.42001 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
