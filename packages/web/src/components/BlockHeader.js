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
        paddingTop: theme.spacing(3),
        zIndex: 101,
        backgroundColor: 'white',
    },
    control: {
        marginLeft: 'auto',
    },
}));

export default function BlockHeader({ title, children, totalRecords }) {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div>
                <Typography variant="h5" classes={{ root: classes.root }}>
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    color="secondary"
                    style={{ visibility: totalRecords ? 'visible' : 'hidden' }}
                >
                    {totalRecords} records
                </Typography>
            </div>
            <div className={classes.control}>{children}</div>
        </div>
    );
}
