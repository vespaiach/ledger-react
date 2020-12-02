import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'flex',
        flexFlow: 'column nowrap',
        border: 'none',
        height: 96,
        width: 108,
        cursor: 'pointer',
        transition: 'visibility 0.3s ease, height 0.5s ease',
        '&:hover': {
            background: theme.palette.grey[100],
        },
    },
    icon: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flex: 0,
        transition: 'flex 0.3s ease',
        fontSize: theme.typography.subtitle1.fontSize,
        textTransform: 'uppercase',
        height: 24,
    },
    textActive: {
        flex: 1,
    },
    filler: {
        flex: 1,
        height: 24,
        width: '100%',
    },
    subText: {
        display: 'none',
    },
}));

export default function MenuItem(props) {
    const {
        onClick,
        title,
        Icon,
        path,
        className,
        subMenuItem = false,
        active = false,
    } = props;
    const classes = useStyles(props);
    const handleClick = () => {
        if (onClick) {
            onClick(path);
        }
    };

    return (
        <div
            role="button"
            className={clsx(classes.button, className)}
            onClick={handleClick}
            title={title}
        >
            <div className={classes.filler}></div>
            <div className={classes.icon}>
                <Icon title={title} />
            </div>
            <div
                className={clsx(classes.text, {
                    [classes.textActive]: active,
                    [classes.subText]: subMenuItem,
                })}
            >
                {title}
            </div>
            <div className={classes.filler}></div>
        </div>
    );
}
