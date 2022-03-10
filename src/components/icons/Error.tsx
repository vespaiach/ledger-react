export default function ErrorIcon({ className, style, width = 24, height = 24 }: BaseIconProps) {
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
      <path
        d="M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
        fill="currentColor"
      />
    </svg>
  );
}
