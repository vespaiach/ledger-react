import './Input.css';

import cx from 'classnames';
import { ChangeEventHandler, ReactNode } from 'react';
import CloseButton from './CloseButton';

interface InputProps extends ComponentBaseProps {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  value?: string;
  defaultValue?: string;
  caption?: string;
  children?: ReactNode;
  id?: string;
  error?: string;
  multiple?: boolean;
}

let rnd = 0;

export function Input({
  id = `input-${++rnd}`,
  error,
  children,
  className,
  style,
  caption,
  multiple = false,
  ...rest
}: InputProps) {
  return (
    <label htmlFor={id} className={cx('input', 'text-input', { error }, className)} style={style}>
      <div className="caption">
        {caption}
        {!!error && <span className="error"> - {error}</span>}
      </div>
      {multiple ? <textarea rows={3} id={id} {...rest} /> : <input id={id} {...rest} />}
      <div className="prefix">{children}</div>
    </label>
  );
}

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
            <CloseButton
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
