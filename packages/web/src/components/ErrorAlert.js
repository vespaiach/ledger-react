import { Alert, AlertTitle } from '@material-ui/lab';

export default function ErrorAlert({ onClose, className, title = 'Error', children }) {
    return (
        <Alert severity="error" className={className} onClose={onClose}>
            <AlertTitle>{title}</AlertTitle>
            {children}
        </Alert>
    );
}
