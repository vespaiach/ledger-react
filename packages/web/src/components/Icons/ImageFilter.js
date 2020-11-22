import { SvgIcon } from '@material-ui/core';

export default function ImageFilter({ number, title, ...rest }) {
    let el = null;
    switch (number) {
        case 1:
            el = (
                <path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M14,15H16V5H12V7H14M3,5H1V21A2,2 0 0,0 3,23H19V21H3V5Z" />
            );
            break;
        case 2:
            el = (
                <path d="M17,13H13V11H15A2,2 0 0,0 17,9V7C17,5.89 16.1,5 15,5H11V7H15V9H13A2,2 0 0,0 11,11V15H17M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3V5Z" />
            );
            break;
        case 3:
            el = (
                <path d="M17,13V11.5A1.5,1.5 0 0,0 15.5,10A1.5,1.5 0 0,0 17,8.5V7C17,5.89 16.1,5 15,5H11V7H15V9H13V11H15V13H11V15H15A2,2 0 0,0 17,13M3,5H1V21A2,2 0 0,0 3,23H19V21H3M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1Z" />
            );
            break;
        case 4:
            el = (
                <path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M15,15H17V5H15V9H13V5H11V11H15M3,5H1V21A2,2 0 0,0 3,23H19V21H3V5Z" />
            );
            break;
        default:
            el = (
                <path d="M21,17H7V3H21M21,1H7A2,2 0 0,0 5,3V17A2,2 0 0,0 7,19H21A2,2 0 0,0 23,17V3A2,2 0 0,0 21,1M3,5H1V21A2,2 0 0,0 3,23H19V21H3V5Z" />
            );
            break;
    }
    return (
        <SvgIcon {...rest}>
            <title>{title || 'Image Filter'}</title>
            <desc>Image Filter</desc>
            {el}
        </SvgIcon>
    );
}
