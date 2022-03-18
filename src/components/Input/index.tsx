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

interface Tag {
  text: string;
}

interface TagInputProps extends ComponentBaseProps {
  caption?: string;
  children?: ReactNode;
  id?: string;
  tags: Tag[];
  onDelete?: (tag: Tag) => void;
}

export function TagInput({ children, tags, caption, className, style, onDelete }: TagInputProps) {
  return (
    <label className={cx('input text-input', className)} style={style}>
      <div className="caption">{caption}</div>
      <div className="tag-list">
        {tags.map((t, i) => (
          <div key={i} className="tag">
            <span>{t.text}</span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(t);
              }}
              style={{ marginRight: 'auto', position: 'static', padding: 0, height: 24, width: 24 }}
            />
          </div>
        ))}
      </div>
      <div className="prefix">{children}</div>
    </label>
  );
}
