/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import NumberFormat from 'react-number-format';

export default function MoneyInput(props: {
  inputRef: ((el: HTMLInputElement) => void) | React.Ref<any>;
  onChange: (val: any) => void;
  name: string;
}) {
  const { inputRef, onChange, ...rest } = props;

  return (
    <NumberFormat
      {...rest}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
