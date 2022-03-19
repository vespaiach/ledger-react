export default function BackArrowIcon({ width = 24, height = 24, className, style }: BaseIconProps) {
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
        d="M19.0025 11H7.83251L12.7125 6.12C13.1025 5.73 13.1025 5.09 12.7125 4.7C12.3225 4.31 11.6925 4.31 11.3025 4.7L4.71251 11.29C4.32251 11.68 4.32251 12.31 4.71251 12.7L11.3025 19.29C11.6925 19.68 12.3225 19.68 12.7125 19.29C13.1025 18.9 13.1025 18.27 12.7125 17.88L7.83251 13H19.0025C19.5525 13 20.0025 12.55 20.0025 12C20.0025 11.45 19.5525 11 19.0025 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
