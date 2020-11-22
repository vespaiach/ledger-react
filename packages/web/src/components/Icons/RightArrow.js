import { SvgIcon } from '@material-ui/core';

export default function RightArrow(props) {
    return (
        <SvgIcon {...props}>
            <title>Right Arrow</title>
            <desc>Bold right arrow</desc>
            <path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
        </SvgIcon>
    );
}
