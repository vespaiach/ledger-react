import './Input.css';

import cx from 'classnames';
import {
  ChangeEventHandler,
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  ElementType,
  Ref,
  ReactElement,
} from 'react';

import { Button } from '../Button';
import CloseIcon from '../icons/Close';

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

interface TagInputProps extends ComponentBaseProps {
  caption?: string;
  children?: ReactNode;
  id?: string;
  tags: string[];
  error?: string;
  onDelete?: (tag: string) => void;
}

export function TagInput({
  children,
  error,
  tags,
  caption,
  className,
  style,
  onDelete,
  ...rest
}: TagInputProps) {
  return (
    <label className={cx('input', 'tag-input', className)} style={style} {...rest}>
      <div className="caption">
        {caption}
        {!!error && <span className="error"> - {error}</span>}
      </div>
      <div className="tag-list">
        {tags.map((t, i) => (
          <div key={i} className="tag">
            <span>{t}</span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(t);
              }}>
              <CloseIcon />
            </Button>
          </div>
        ))}
      </div>
      <div className="input-adds-in flex-center">{children}</div>
    </label>
  );
}
