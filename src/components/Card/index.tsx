import './Card.css';

import cx from 'classnames';
import { MouseEventHandler, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';

import TrashIcon from '../icons/Trash';
import PenIcon from '../icons/Pen';
import { Button } from '../Button';

interface CardProps extends ComponentBaseProps {
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: () => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Card({ className, onClick, onDelete, onEdit, ...rest }: CardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [deleting, setDeleting] = useState(false);

  return (
    <Transition in={!deleting} timeout={400} unmountOnExit onExited={onDelete}>
      {(state) => (
        <div
          ref={divRef}
          className={cx('card-pane', { 'card-pane--collapse': state === 'exiting' }, className)}
          onClick={onClick}>
          <div className="card-sheet">
            <Button boxLess onClick={onEdit} title="edit">
              <PenIcon />
            </Button>
            <Button
              boxLess
              onClick={() => {
                if (!divRef.current) {
                  onDelete?.();
                  return;
                }

                const { height } = divRef.current?.getBoundingClientRect();
                divRef.current?.style.setProperty('height', `${height}px`);
                setTimeout(() => {
                  setDeleting(true);
                });
              }}
              title="delete">
              <TrashIcon />
            </Button>
          </div>
          <article {...rest} className={cx('card', className)} />
        </div>
      )}
    </Transition>
  );
}
