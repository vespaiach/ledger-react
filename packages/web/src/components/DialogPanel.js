import {
    AppBar,
    Container,
    Dialog,
    IconButton,
    Typography,
    Slide,
    Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';

const SlideUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialogTitleRoot: {
        textAlign: 'center',
        flexGrow: 1,
        marginRight: 48,
    },
    btnCloseRoot: {
        color: 'white',
    },
    dialogScrollPaper: {
        flexFlow: 'column nowrap',
    },
}));

export default function DialogPanel({ open, title, children, onClose, ...rest }) {
    const classes = useStyles();

    return (
        <Dialog
            {...rest}
            fullScreen
            open={open}
            onClose={onClose}
            PaperProps={{ btnCloseRoot: classes.btnCloseRoot, onClose }}
            TransitionComponent={SlideUp}>
            <AppBar position="static" color="transparent">
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
                        variant="h6"
                        color="primary">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}
