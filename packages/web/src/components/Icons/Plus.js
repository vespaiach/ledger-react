import { SvgIcon } from '@material-ui/core';

export default function Plus(props) {
    return (
        <SvgIcon
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ fill: 'none' }}
            {...props}
        >
            <title>{props.title || 'Plus'}</title>
            <desc>Plus</desc>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
        </SvgIcon>
    );
}
