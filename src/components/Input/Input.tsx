import './Input.css';

import cx from 'classnames';
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  forwardRef,
  ElementType,
  Ref,
  ReactElement,
} from 'react';

type InputElementType = 'input' | 'textarea';

interface InputProps<T extends InputElementType> extends ComponentBaseProps {
  id?: string;
  onChange?: ChangeEventHandler<T extends 'input' ? HTMLInputElement : HTMLTextAreaElement>;
  value?: string;
  defaultValue?: string;
  caption?: string;
  as?: T;
  error?: string;
}

type InputComponentProps<T extends InputElementType> = InputProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof InputProps<T>>;

let rnd = 0;

export const Input: <T extends InputElementType>(
  props: InputComponentProps<T> & { ref?: Ref<T extends 'input' ? HTMLInputElement : HTMLTextAreaElement> }
) => ReactElement | null = forwardRef(function InputComponent<T extends InputElementType = 'input'>(
  { id = `input-${++rnd}`, error, children, className, style, caption, as, ...rest }: InputComponentProps<T>,
  ref: Ref<T extends 'input' ? HTMLInputElement : HTMLTextAreaElement>
) {
  const Component = (as ?? 'input') as ElementType;

  return (
    <label htmlFor={id} className={cx('input', { error }, className)} style={style}>
      <div className="caption">
        {caption}
        {!!error && <span className="error"> - {error}</span>}
      </div>
      <Component {...rest} id={id} ref={ref} />
      <div className="input-adds-in flex-center">{children}</div>
    </label>
  );
});
