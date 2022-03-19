import './Button.css';

import cx from 'classnames';
import { ReactEventHandler, ElementType, ComponentPropsWithoutRef } from 'react';
import { Spinner } from '../Spinner';

interface ButtonProps<I> extends ComponentBaseProps {
  text?: string;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  as?: I;
  loading?: boolean;
  boxLess?: boolean;
}

const defaultElement = 'button';

export function Button<I extends ElementType = typeof defaultElement>({
  text,
  children,
  className,
  disabled,
  loading,
  boxLess,
  as,
  onClick,
  ...rest
}: ButtonProps<I> & Omit<ComponentPropsWithoutRef<I>, keyof ButtonProps<I>>) {
  const Component = as ?? defaultElement;

  return (
    <Component
      {...rest}
      className={cx('button', { disabled, 'box-less': boxLess }, className)}
      onClick={(e) => (loading || disabled ? null : onClick?.(e))}>
      {loading && (
        <div className="flex-center spinner-sheet">
          <Spinner width={24} height={24} />
        </div>
      )}
      {text && <span>{text}</span>}
      {children}
    </Component>
  );
}
