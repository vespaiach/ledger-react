import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.secondary.main,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: theme.spacing(1),
        position: 'sticky',
        top: 0,
        zIndex: 101,
        backgroundColor: 'white',
    },
    control: {
        marginLeft: 'auto',
    },
}));

export default function BlockHeader({ title, children }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Typography variant="h5" classes={{ root: classes.root }}>
                {title}
            </Typography>
            <div className={classes.control}>{children}</div>
        </div>
    );
}
