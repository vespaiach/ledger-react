import { Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
}

export default function FlashMessage({ open, onClose, timeout = 5000, children, severity }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={timeout}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            TransitionComponent={TransitionDown}>
            <Alert
                onClose={onClose}
                severity={severity || 'info'}
                role="alertdialog"
                aria-describedby="snackbarAlertText">
                <span id="snackbarAlertText">{children}</span>
            </Alert>
        </Snackbar>
    );
}
