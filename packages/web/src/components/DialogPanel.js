import { Container, Dialog, IconButton, Paper, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';

const SlideUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ExtendedPaper = forwardRef(function ExtendedPaper({ btnCloseRoot, onClose, ...other }, ref) {
    return (
        <>
            <IconButton
                classes={{ root: btnCloseRoot }}
                onClick={(evt) => {
                    evt.stopPropagation();
                    if (onClose) {
                        onClose();
                    }
                }}>
                <CloseRoundedIcon />
            </IconButton>
            <Paper ref={ref} {...other} />
        </>
    );
});

const useStyles = makeStyles((theme) => ({
    dialogRoot: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    },
    btnCloseRoot: {
        color: 'white',
    },
    dialogScrollPaper: {
        flexFlow: 'column nowrap',
    },
    dialogPaperFullScreen: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    boxContent: {
        background: 'rgba(0,0,0,0.07)',
    },
}));

export default function DialogPanel({ open, title, footer, children, onClose, ...rest }) {
    const classes = useStyles();

    return (
        <Dialog
            {...rest}
            fullScreen
            classes={{
                root: classes.dialogRoot,
                scrollPaper: classes.dialogScrollPaper,
                paperFullScreen: classes.dialogPaperFullScreen,
            }}
            open={open}
            onClose={onClose}
            PaperComponent={ExtendedPaper}
            PaperProps={{ btnCloseRoot: classes.btnCloseRoot, onClose }}
            TransitionComponent={SlideUp}>
            <Container maxWidth="xs" disableGutters>
                {title}
            </Container>
            <div className={classes.boxContent}>
                <Container maxWidth="xs" disableGutters>
                    {children}
                </Container>
            </div>
            <Container maxWidth="xs" disableGutters>
                {footer}
            </Container>
        </Dialog>
    );
}
