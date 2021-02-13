import { AppBar, Dialog, IconButton, Typography, Slide, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';
import clsx from 'clsx';

const SlideUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    dialogTitleRoot: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: 600,
    },
    btnCloseRoot: {
        color: 'white',
    },
    dialogScrollPaper: {
        flexFlow: 'column nowrap',
    },
    btnReset: {
        padding: 0,
    },
    hidden: {
        visibility: 'hidden',
    },
});

export default function DialogPanel({ open, title, children, onClose, onReset, ...rest }) {
    const classes = useStyles();

    return (
        <Dialog {...rest} fullScreen open={open} onClose={onClose} TransitionComponent={SlideUp}>
            <AppBar position="static" color="transparent" elevation={3}>
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        onClick={onClose}
                        color="default"
                        aria-label="menu">
                        <CloseRoundedIcon />
                    </IconButton>
                    <Typography
                        classes={{ root: classes.dialogTitleRoot }}
                        variant="subtitle1"
                        color="primary">
                        {title}
                    </Typography>
                    <Button
                        disableRipple
                        variant="text"
                        className={clsx(!onReset && classes.hidden)}
                        classes={{ root: classes.btnReset }}
                        onClick={(evt) => {
                            evt.stopPropagation();
                            if (onReset) {
                                onReset();
                            }
                        }}>
                        Reset
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}
