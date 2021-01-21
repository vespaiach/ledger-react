import { Collapse } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function ErrorAlert({ open, onClose, className, title = 'Error', children }) {
    return (
        <Collapse in={open}>
            <Alert severity="error" className={className} onClose={onClose}>
                <AlertTitle>{title}</AlertTitle>
                {children}
            </Alert>
        </Collapse>
    );
}
