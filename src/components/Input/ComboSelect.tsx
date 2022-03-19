import './Input.css';

import cx from 'classnames';
import CloseIcon from '../icons/Close';
import { Button } from '../Button';

let inc = 0;

export function ComboSelect({
  id = `select-${++inc}`,
  options,
  value,
  onChange,
  caption,
  error,
  className,
}: {
  className?: string;
  error?: string;
  id?: string;
  options: string[];
  value: string;
  caption: string;
  onChange: (value: string) => void;
}) {
  const listName = `list-${inc}`;

  return (
    <label className={cx('input combo-select', { error }, className)}>
      <div className="caption">
        {caption}
        {!!error && <span className="error"> - {error}</span>}
      </div>
      <input
        autoComplete="off"
        list={listName}
        id={id}
        type="text"
        value={value}
        onChange={(e) => void onChange(e.target.value)}
      />
      <datalist id={listName}>
        {options.map((op) => (
          <option key={op} value={op} />
        ))}
      </datalist>
      {value && (
        <div className="button-sheet">
          <Button
            boxLess
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              onChange('');
            }}>
            <CloseIcon />
          </Button>
        </div>
      )}
    </label>
  );
}
