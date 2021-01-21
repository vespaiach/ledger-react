import {
    Button,
    DialogContentText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    DeleteForeverRounded as DeleteRoundedIcon,
    WarningRounded as WarningRoundedIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    dialogRoot: {},
    boxCard: {
        display: 'flex',
        minWidth: 320,
        [theme.breakpoints.up('xs')]: {
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
}));

export default function ConfirmDialog({ open, title, type, message, onYes, onNo, onClose }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    return (
        <Dialog
            fullScreen={mobile}
            classes={{ root: classes.dialogRoot }}
            open={open}
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
