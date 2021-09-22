import { forwardRef } from 'react';
import NumberFormat from 'react-number-format';

export const MoneyInput = forwardRef(
  (
    props: {
      onChange: (val: any) => void;
      name: string;
    },
    ref
  ) => {
    const { onChange, ...rest } = props;

    return (
      <NumberFormat
        {...rest}
        getInputRef={ref}
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
);
