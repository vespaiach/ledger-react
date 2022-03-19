import './Message.css';

import cx from 'classnames';
import { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Button } from '../Button';
import ErrorIcon from '../icons/Error';
import SuccessIcon from '../icons/Success';
import CloseIcon from '../icons/Close';

export default function Message({ data, onClose }: { onClose: () => void; data: AppMessage }) {
  const [open, setOpen] = useState<boolean>(false);

  let iconEl = null;
  if (data.type === 'error') {
    iconEl = <ErrorIcon />;
  } else if (data.type === 'success') {
    iconEl = <SuccessIcon />;
  }

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!data.timeout) return;

    let unmount = false;

    setTimeout(() => {
      if (unmount) return;

      setOpen(false);
    }, data.timeout);

    return () => {
      unmount = true;
    };
  }, [data.timeout]);

  return (
    <CSSTransition in={open} unmountOnExit timeout={300} classNames="fade" onExited={onClose}>
      <article className={cx('message-sheet', data.type)}>
        {iconEl}
        <p>{data.message}</p>
        <Button boxLess onClick={onClose}>
          <CloseIcon />
        </Button>
      </article>
    </CSSTransition>
  );
}
