import { Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Skeleton } from '@material-ui/lab';
import useImg from '../hooks/useImg';

const useStyles = makeStyles((theme) => ({
    leftGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    image: {
        width: '100%',
        height: '100vh',
        backgroundPosition: 'center',
        backgroundSize: '50%',
        backgroundRepeat: 'no-repeat',
    },
    stopSkeleton: {
        '&::after': {
            display: 'none',
        },
    },
}));
export default function AuthBasePage({ children, imgSrc }) {
    const classes = useStyles();
    const src = useImg(imgSrc, '');

    let style = null;
    if (src) {
        style = { backgroundImage: `url(${src})` };
    }

    return (
        <Grid container spacing={0}>
            <Grid item sm={5} md={6} classes={{ root: classes.leftGrid }}>
                <Skeleton
                    animation="wave"
                    variant="rect"
                    component="div"
                    classes={{ root: classes.image }}
                    className={clsx({ [classes.stopSkeleton]: Boolean(src) })}
                    style={style}
                />
            </Grid>
            <Grid item xs={12} sm={7} md={6}>
                <Grid container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
