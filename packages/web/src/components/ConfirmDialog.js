import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions } from '@material-ui/core';

export default function FormDialog({ open, title, text, children, onClose, onYes, ...rest }) {
    return (
        <Dialog {...rest} open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onYes} color="primary" autoFocus>
                    YES
                </Button>
                <Button onClick={onClose} color="primary">
                    NO
                </Button>
            </DialogActions>
        </Dialog>
    );
}
