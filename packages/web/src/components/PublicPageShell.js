import { makeStyles } from '@material-ui/core';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    boxMain: {
        height: '100vh',
        display: 'flex',
    },
    boxImage: {
        flex: 1,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    boxContent: {
        flex: 1,
        position: 'relative',
    },
    boxContentMain: {
        minHeight: 580,
    },
    footer: {
        position: 'fixed',
        bottom: 8,
        right: 8,
    },
}));

export default function Signin({ children, imgSrc }) {
    const classes = useStyles();
    return (
        <div className={classes.boxMain}>
            <div className={classes.boxImage} style={{ backgroundImage: `url(${imgSrc})` }}></div>
            <div className={classes.boxContent}>
                <div className={classes.boxContentMain}>{children}</div>
                <Footer className={classes.footer} />
            </div>
        </div>
    );
}
