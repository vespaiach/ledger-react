import './Appbar.css';

import { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { listenTo } from '../utils/window';
import FilterMenu from './FilterMenu';

export default function Appbar() {
  const [openFilter, setOpenFilter] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenFilter(false);
  }, []);

  useEffect(
    () =>
      listenTo(window.document, 'scroll', function () {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
      }),
    []
  );

  return (
    <>
      <div className={cx('curtain', { 'curtain--in': openFilter })} />
      <div className={cx('flex-column appbar_filter', { 'appbar_filter--in': openFilter })}>
        <div className="flex-item-stretch appbar_filter_content">
          <FilterMenu onClose={handleClose} />
        </div>
      </div>
      <div className={cx('appbar', { 'appbar--float': scrolled })}>
        <button className="button-icon" onClick={handleOpen}>
          <svg className="icon" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
