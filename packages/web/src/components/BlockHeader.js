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
        <div className={classes.container} ref="">
            <div>
                <Typography variant="h5" classes={{ root: classes.root }}>
                    {title}
                </Typography>
                {totalRecords ? (
                    <Typography variant="body2" color="secondary">
                        {totalRecords} records
                    </Typography>
                ) : null}
            </div>
            <div className={classes.control}>{children}</div>
        </div>
    );
}
