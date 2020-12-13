import { Dialog, DialogTitle, DialogContent, DialogContentText, Button, makeStyles } from '@material-ui/core';

let inc = 0;

const useStyles = makeStyles((theme) => ({
    form: {
        '& .MuiDialogContent-root': {
            paddingTop: 0,
            '& .MuiFormControl-root': {
                marginBottom: theme.spacing(1),
            },
        },
    },
    title: {
        color: theme.palette.secondary.main,
        padding: theme.spacing(4),
    },
    content: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    actions: {
        marginTop: theme.spacing(2),
        display: 'flex',
        '& button + button': {
            marginLeft: theme.spacing(1),
        },
        '& .submit': {
            flex: 1,
        },
    },
}));

export default function FormDialog({
    open,
    title,
    text,
    id = `form-dialog-title-${inc++}`,
    children,
    onClose,
    onSubmit,
    ...rest
}) {
    const classes = useStyles();
    return (
        <Dialog
            {...rest}
            open={open}
            onClose={onClose}
            aria-labelledby={id}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
        >
            <DialogTitle id={id} classes={{ root: classes.title }}>
                {title}
            </DialogTitle>
            <form
                onSubmit={(evt) => {
                    evt.preventDefault();
                    if (onSubmit) {
                        onSubmit(evt);
                    }
                }}
                className={classes.form}
            >
                <DialogContent classes={{ root: classes.content }}>
                    {text && <DialogContentText>{text}</DialogContentText>}
                    {children}
                    <div className={classes.actions}>
                        <Button type="submit" variant="contained" color="primary" disableElevation className="submit">
                            Submit
                        </Button>
                        <Button variant="contained" onClick={onClose} disableElevation>
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
