import cx from 'classnames';

interface ContainerProps extends ComponentBaseProps {}

export default function Container({ className, ...rest }: ContainerProps) {
  return <div className={cx('container', className)} {...rest} />;
}
