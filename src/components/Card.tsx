import './Card.css';

import cx from 'classnames';
import { MouseEventHandler } from 'react';

import TrashIcon from './icons/Trash';
import PenIcon from './icons/Pen';

interface CardProps extends ComponentBaseProps {
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({ className, onClick, onDelete, onEdit, ...rest }: CardProps) {
  return (
    <div className="card-pane" onClick={onClick}>
      <div className="card-sheet">
        <button onClick={onEdit} title="edit">
          <PenIcon />
        </button>
        <button onClick={onDelete} title="delete">
          <TrashIcon />
        </button>
      </div>
      <article {...rest} className={cx('card', className)} />
    </div>
  );
}
