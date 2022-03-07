import './Card.css';

import cx from 'classnames';

interface CardProps extends ComponentBaseProps {}

export default function Card({ className, ...rest }: CardProps) {
  return <article {...rest} className={cx('card', className)} />;
}
