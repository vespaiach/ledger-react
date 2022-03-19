import './Input.css';

import { ReactNode } from 'react';
import cx from 'classnames';

import { Button } from '../Button';
import CloseIcon from '../icons/Close';

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
