import {
    Button,
    DialogContentText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
    Slide,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    DeleteForeverRounded as DeleteRoundedIcon,
    WarningRounded as WarningRoundedIcon,
} from '@material-ui/icons';
import { forwardRef } from 'react';

const SlideUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    boxCard: {
        display: 'flex',
        minWidth: 320,
        [theme.breakpoints.up('sm')]: {
            width: 420,
        },
    },
    boxCardContent: {
        flex: 1,
    },
    titleRoot: {
        color: theme.palette.warning.main,
    },
    iconRoot: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        width: '4rem',
        height: '4rem',
        color: theme.palette.warning.main,
    },
    btnOk: {
        color: theme.palette.warning.main,
    },
    dialogScrollPaper: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(6),
        },
    },
    dialogPaperFullScreen: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
}));

export default function ConfirmDialog({ open, title, type, message, onYes, onNo, onClose }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    return (
        <Dialog
            fullScreen={mobile}
            classes={{
                scrollPaper: classes.dialogScrollPaper,
                paperFullScreen: classes.dialogPaperFullScreen,
            }}
            open={open}
            TransitionComponent={SlideUp}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <div className={classes.boxCard}>
                {type === 'delete' ? (
                    <DeleteRoundedIcon classes={{ root: classes.iconRoot }} />
                ) : (
                    <WarningRoundedIcon classes={{ root: classes.iconRoot }} />
                )}
                <div className={classes.boxCardContent}>
                    <DialogTitle id="alert-dialog-title" classes={{ root: classes.titleRoot }}>
                        {title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                </div>
            </div>
            <DialogActions>
                <Button onClick={onYes} classes={{ root: classes.btnOk }}>
                    Do it
                </Button>
                <Button onClick={onNo} color="primary" autoFocus>
                    cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
