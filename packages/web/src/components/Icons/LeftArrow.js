import { SvgIcon } from '@material-ui/core';

export default function LeftArrow(props) {
    return (
        <SvgIcon {...props}>
            <title>Left Arrow</title>
            <desc>Bold left arrow</desc>
            <path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
        </SvgIcon>
    );
}
