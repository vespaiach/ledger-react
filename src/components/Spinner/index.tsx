import './Spinner.css';

import cx from 'classnames';

interface SpinnerProps {
  width?: number | StringDigitOnly;
  height?: number | StringDigitOnly;
  className?: string;
}

export function Spinner({ width = 50, height = 50, className }: SpinnerProps) {
  return (
    <svg className={cx('spinner', className)} viewBox="0 0 50 50" width={width} height={height}>
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="full-page flex-center">
      <Spinner />
    </div>
  );
}
