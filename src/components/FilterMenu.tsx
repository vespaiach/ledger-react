import { animated, useSpring } from '@react-spring/web';
import NumberFormat from 'react-number-format';
import flatpickr from 'flatpickr';

import './FilterMenu.css';
import Input from './Input';

export default function FilterMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="filter-pane">
      <h1>Filters</h1>
      <button className="button-icon button-close" onClick={onClose}>
        <svg className="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
      <div className="amount-input">
        <NumberFormat
          caption="min amount"
          customInput={Input}
          thousandSeparator={true}
          onValueChange={(values) => {
            const { value } = values;
          }}>
          $
        </NumberFormat>
        <div className="flex-center" style={{ fontWeight: 700, fontSize: 18, color: 'rgb(113,113,113)' }}>
          -
        </div>
        <NumberFormat
          caption="max amount"
          customInput={Input}
          thousandSeparator={true}
          onValueChange={(values) => {
            const { value } = values;
          }}>
          $
        </NumberFormat>
      </div>
      <div className="date-input">
        <Input />
      </div>
    </div>
  );
}
