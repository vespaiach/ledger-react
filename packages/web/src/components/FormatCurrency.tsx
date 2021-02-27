import NumberFormat from 'react-number-format';

export default function FormatCurrency({ money }: { money: number }) {
    return (
        <NumberFormat
            value={money}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            decimalScale={2}
            fixedDecimalScale
        />
    );
}
