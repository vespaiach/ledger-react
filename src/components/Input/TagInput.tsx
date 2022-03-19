import './Input.css';

import { ReactNode } from 'react';
import cx from 'classnames';

import { Button } from '../Button';
import CloseIcon from '../icons/Close';

interface Tag {
  text: string;
}

interface TagInputProps extends ComponentBaseProps {
  caption?: string;
  children?: ReactNode;
  id?: string;
  tags: Tag[];
  error?: string;
  onDelete?: (tag: Tag) => void;
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
            <span>{t.text}</span>
            <Button
              boxLess
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
      {children}
    </label>
  );
}
