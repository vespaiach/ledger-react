import { Skeleton } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chart: {
        display: 'flex',
        marginBottom: theme.spacing(3),
    },
    bar: {
        flex: '0 0 136px',
        display: 'flex',
        alignItems: 'flex-end',
        '& .MuiSkeleton-root + .MuiSkeleton-root': {
            marginLeft: theme.spacing(1),
        },
    },
    legend: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableBar: {
        marginBottom: theme.spacing(1),
    },
}));

export default function SkeletonPage() {
    const classes = useStyles();

    return (
        <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} sm={12} md={4}>
                <div className={classes.chart}>
                    <div className={classes.bar}>
                        <Skeleton width={48} height={120} component="div" variant="rect" />
                        <Skeleton width={48} height={200} component="div" variant="rect" />
                    </div>
                    <div className={classes.legend}>
                        <Skeleton width={100} height={130} variant="rect" component="div" />
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Skeleton
                    width="100%"
                    height={58}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
                <Skeleton
                    width="100%"
                    height={58}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
                <Skeleton
                    width="100%"
                    height={32}
                    variant="rect"
                    component="div"
                    className={classes.tableBar}
                />
            </Grid>
        </Grid>
    );
}
