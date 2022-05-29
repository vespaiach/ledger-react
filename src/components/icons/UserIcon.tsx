export default function UserIcon({ className, style, width = 24, height = 24 }: BaseIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 13C16.71 13 20 15.467 20 19C20 19.5523 19.5523 20 19 20H5C4.48223 20 4.05637 19.6065 4.00516 19.1022L4 19C4 15.467 7.29 13 12 13ZM12 15C8.85507 15 6.73074 16.2338 6.1564 18H17.8436C17.2693 16.2338 15.1449 15 12 15ZM12 4C14.206 4 16 5.795 16 8C16 10.206 14.206 12 12 12C9.794 12 8 10.206 8 8C8 5.795 9.794 4 12 4ZM12 6C10.899 6 10 6.89915 10 8C10 9.10143 10.8986 10 12 10C13.1014 10 14 9.10143 14 8C14 6.89915 13.101 6 12 6Z"
        fill="black"
      />
    </svg>
  );
}
