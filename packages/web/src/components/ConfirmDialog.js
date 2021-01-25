import { Button, DialogContentText, DialogActions, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    DeleteForeverRounded as DeleteRoundedIcon,
    WarningRounded as WarningRoundedIcon,
} from '@material-ui/icons';

import DialogPanel from './DialogPanel';

const useStyles = makeStyles((theme) => ({
    boxCardContent: {
        padding: theme.spacing(4, 3, 3, 3),
        display: 'flex',
    },
    titleRoot: {
        color: theme.palette.warning.main,
    },
    iconRoot: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(3),
        width: '4rem',
        height: '4rem',
        color: theme.palette.warning.main,
    },
    btnOk: {
        color: theme.palette.warning.main,
    },
    contentText: {
        marginBottom: 0,
    },
}));

export default function ConfirmDialog({ open, title, type, message, onYes, onNo, onClose }) {
    const classes = useStyles();

    return (
        <DialogPanel
            title={
                <DialogTitle id="alert-dialog-title" classes={{ root: classes.titleRoot }}>
                    {title}
                </DialogTitle>
            }
            footer={
                <DialogActions>
                    <Button onClick={onYes} classes={{ root: classes.btnOk }}>
                        Do it
                    </Button>
                    <Button onClick={onNo} color="primary" autoFocus>
                        cancel
                    </Button>
                </DialogActions>
            }
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <div className={classes.boxCardContent}>
                {type === 'delete' ? (
                    <DeleteRoundedIcon classes={{ root: classes.iconRoot }} />
                ) : (
                    <WarningRoundedIcon classes={{ root: classes.iconRoot }} />
                )}
                <DialogContentText id="alert-dialog-description" className={classes.contentText}>
                    {message}
                </DialogContentText>
            </div>
        </DialogPanel>
    );
}
