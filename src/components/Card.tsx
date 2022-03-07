import './Card.css';

import cx from 'classnames';
import { MouseEventHandler } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

import TrashIcon from './icons/Trash';
import PenIcon from './icons/Pen';

interface CardProps extends ComponentBaseProps {
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}

export default function Card({ className, onDelete, onEdit, ...rest }: CardProps) {
  const [styles, api] = useSpring(() => ({ left: 0, delay: 100 }));

  const bind = useDrag((arg) => {
    const {
      active,
      velocity: [vx],
      direction: [xDir],
    } = arg;
    const isOpen = !active && vx > 0.3 && xDir === -1;
    api.start({
      left: isOpen ? -180 : 0,
      delay: undefined,
      config: { friction: 30, tension: active ? 600 : isOpen ? 200 : 300 },
    });
  });

  return (
    <div className="card-pane">
      <div className="card-sheet">
        <button onClick={onEdit} title="edit">
          <PenIcon />
        </button>
        <button onClick={onDelete} title="delete">
          <TrashIcon />
        </button>
      </div>
      <animated.article {...rest} {...bind()} style={styles} className={cx('card', className)} />
    </div>
  );
}
