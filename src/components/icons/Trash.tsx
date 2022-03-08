export default function TrashIcon({ className, style, width = 24, height = 24 }: BaseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M15 3V5H21V7H3V5H9V3H15Z" fill="currentColor" />
      <path d="M11 12H9V18H11V12Z" fill="currentColor" />
      <path d="M13 12H15V18H13V12Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 22C5.897 22 5 21.103 5 20V8H19V20C19 21.103 18.103 22 17 22H7ZM17 10H7V20H17.001L17 10Z"
        fill="currentColor"
      />
    </svg>
  );
}
