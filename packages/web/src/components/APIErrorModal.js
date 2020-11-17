import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    title: {
        fontSize: '2.25rem',
        color: red[500],
        minWidth: 350,
    },
}));

export default function APIErrorModal({ open, onClose, code = '', messages }) {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle
                disableTypography
                id="alert-dialog-title"
                classes={{ root: classes.title }}
            >
                {`{ ${code} }`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    component="div"
                    id="alert-dialog-description"
                >
                    {messages.map((m, i) => (
                        <p key={i}>{m}</p>
                    ))}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
