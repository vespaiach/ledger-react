export default function SuccessIcon({ className, style, width = 24, height = 24 }: BaseIconProps) {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM10.7603 16.3156C11.0918 16.5366 11.5389 16.4547 11.7704 16.1305L16.3322 9.74453C16.7336 9.18263 16.6034 8.40171 16.0414 8.00045C15.4795 7.59926 14.6988 7.7295 14.2975 8.29136L10.728 13.29L9.77543 12.6544C9.20092 12.271 8.42435 12.4261 8.04129 13.0009C7.65839 13.5754 7.81368 14.3515 8.38814 14.7344L10.7603 16.3156Z"
        fill="currentColor"
      />
    </svg>
  );
}
