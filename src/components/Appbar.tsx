import { useCallback, useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import cx from 'classnames';

import { listenTo } from '../utils/window';
import './Appbar.css';

export default function Appbar() {
  const appbarRef = useRef<HTMLDivElement>(null);
  const openStatusRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);

  const [spring, api] = useSpring(() => ({
    y: '-104%',
    height: '100vh',
    position: 'fixed',
    width: '100%',
    zIndex: 102,
    config: config.stiff,
  }));

  const handleOpen = useCallback(() => {
    openStatusRef.current = true;

    appbarRef.current?.setAttribute('style', 'opacity: 0');

    api.start(() => ({ y: '0%' }));
  }, [api]);

  const handleClose = useCallback(() => {
    openStatusRef.current = false;

    appbarRef.current?.setAttribute('style', 'opacity: 1');

    api.start(() => ({ y: '-104%' }));
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
      <animated.div style={spring} className="flex-column appbar_filter">
        <div className="flex-item-stretch appbar_filter_content">sldkflsd</div>
        <div className="flex-item-stand flex-center appbar_filter_footer">
          <button className="button-icon" onClick={handleClose}>
            <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </button>
        </div>
      </animated.div>
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
