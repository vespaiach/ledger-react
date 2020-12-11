import React from 'react';
import NumberFormat from 'react-number-format';

export default function MoneyInput(props) {
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
