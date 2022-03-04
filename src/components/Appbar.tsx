import { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import cx from 'classnames';

import { listenTo } from '../utils/window';
import './Appbar.css';
import FilterMenu from './FilterMenu';

export default function Appbar() {
  const appbarRef = useRef<HTMLDivElement>(null);
  const openStatusRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  const [spring, api] = useSpring(() => ({
    y: '100%',
    height: '100vh',
    position: 'fixed',
    width: '100%',
    zIndex: 102,
    config: { duration: 250 },
  }));

  const handleOpen = useCallback(() => {
    openStatusRef.current = true;

    api.start(() => ({ y: '24px' }));
  }, [api]);

  const handleClose = useCallback(() => {
    openStatusRef.current = false;

    api.start(() => ({ y: '100%', config: config.stiff }));
  }, [api]);

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
      <animated.div style={spring} className="curtain" />
      <animated.aside style={spring} className="flex-column appbar_filter">
        <div className="flex-item-stretch appbar_filter_content">
          <FilterMenu onClose={handleClose} />
        </div>
      </animated.aside>
      <div className={cx('appbar', { 'appbar--float': scrolled })} ref={appbarRef}>
        <button className="button-icon" onClick={handleOpen}>
          <svg className="icon" fill="currentColor" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
        </button>
      </div>
    </>
  );
}
