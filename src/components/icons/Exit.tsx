export default function ExitIcon({ width = 24, height = 24, className, style }: BaseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_586_4260)">
        <path
          d="M18 20.999V3.999C18 2.897 17.103 1.999 16 1.999H8C6.897 1.999 6 2.897 6 3.999V20.999H3V22.999H21V20.999H18ZM8 20.999V3.999H16L16.001 20.999H8Z"
          fill="currentColor"
        />
        <path d="M15 9.999H13V13.999H15V9.999Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_586_4260">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
