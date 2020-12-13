import { SvgIcon } from '@material-ui/core';

export default function Sort(props) {
    return (
        <SvgIcon {...props}>
            <title>{props.title || 'Sort'}</title>
            <desc>Close Box</desc>
            <path d="M19 17H22L18 21L14 17H17V3H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
        </SvgIcon>
    );
}
