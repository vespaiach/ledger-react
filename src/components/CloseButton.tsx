import cx from 'classnames';
import { MouseEventHandler } from 'react';

interface CloseButtonProps extends ComponentBaseProps {
  title?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CloseButton({ onClick, style, className, ...rest }: CloseButtonProps) {
  return (
    <button {...rest} className={cx('button-icon button-close', className)} onClick={onClick} style={style}>
      <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </button>
  );
}
