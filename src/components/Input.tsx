import './Input.css';

import cx from 'classnames';
import { ChangeEventHandler, ReactNode } from 'react';

interface InputProps extends ComponentBaseProps {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  caption?: string;
  children?: ReactNode;
  id?: string;
}

let rnd = 0;

export default function Input({
  id = `input-${++rnd}`,
  children,
  className,
  style,
  caption,
  ...rest
}: InputProps) {
  return (
    <label htmlFor={id} className={cx('text-input', className)} style={style}>
      <div className="caption">{caption}</div>
      <input id={id} {...rest} />
      <div className="prefix">{children}</div>
    </label>
  );
}
