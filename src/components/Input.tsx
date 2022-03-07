import './Input.css';

import cx from 'classnames';
import { ChangeEventHandler, ReactNode } from 'react';
import CloseButton from './CloseButton';

interface InputProps extends ComponentBaseProps {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  defaultValue?: string;
  caption?: string;
  children?: ReactNode;
  id?: string;
}

let rnd = 0;

export function Input({ id = `input-${++rnd}`, children, className, style, caption, ...rest }: InputProps) {
  return (
    <label htmlFor={id} className={cx('text-input', className)} style={style}>
      <div className="caption">{caption}</div>
      <input id={id} {...rest} />
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
    <label className={cx('text-input', className)} style={style}>
      <div className="caption">{caption}</div>
      <div className="tag-list">
        {tags.map((t, i) => (
          <div key={i} className="tag">
            <span>{t.text}</span>
            <CloseButton
              onClick={() => onDelete?.(t)}
              style={{ marginRight: 'auto', position: 'static', padding: 0, height: 24, width: 24 }}
            />
          </div>
        ))}
      </div>
      <div className="prefix">{children}</div>
    </label>
  );
}
