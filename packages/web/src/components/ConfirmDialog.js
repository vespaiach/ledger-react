import {
    Button,
    DialogContentText,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    DeleteForeverRounded as DeleteRoundedIcon,
    WarningRounded as WarningRoundedIcon,
} from '@material-ui/icons';

import DialogPanel from './DialogPanel';

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
    const classes = useStyles();

    return (
        <DialogPanel
            open={open}
            ariaLabelledby="alert-dialog-title"
            ariaDescribedby="alert-dialog-description">
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
        </DialogPanel>
    );
}
