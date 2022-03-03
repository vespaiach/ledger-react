import './FilterMenu.css';
import { animated, useSpring } from '@react-spring/web';

export default function FilterMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const style = useSpring({
    y: open ? '0%' : '-110%',
  });

  return (
    <animated.aside className="filter-menu" style={style}>
      <div className="pane">
        <button onClick={onClose}></button>
      </div>
    </animated.aside>
  );
}
