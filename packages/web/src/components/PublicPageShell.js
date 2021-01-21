import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from './Footer';
import LazyBackgroundImage from './LazyBackgroundImage';

const useStyles = makeStyles((theme) => ({
    gridContainerRoot: {
        height: '100vh',
    },
    gridImageRoot: {
        height: '100vh',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    img: {
        height: '100vh',
    },
    footer: {
        position: 'fixed',
        bottom: 8,
        right: 8,
    },
}));

export default function Signin({ children, imgSrc, imgSsrc }) {
    const classes = useStyles();
    return (
        <Grid spacing={0} container classes={{ root: classes.gridContainerRoot }}>
            <Grid item xs sm={5} md={6} classes={{ root: classes.gridImageRoot }}>
                <LazyBackgroundImage src={imgSrc} ssrc={imgSsrc} className={classes.img} />
            </Grid>
            <Grid item xs sm={7} md={6}>
                <Container>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} sm={11} md={10} lg={7} xl={5}>
                            {children}
                        </Grid>
                    </Grid>
                </Container>
                <Footer className={classes.footer} />
            </Grid>
        </Grid>
    );
}
