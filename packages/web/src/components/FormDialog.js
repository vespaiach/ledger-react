import { Dialog, DialogTitle, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';

import LoadingButton from './LoadingButton';

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
        marginTop: theme.spacing(3),
        display: 'flex',
        '& .cancel': {
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
    loading,
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
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            loading={loading}
                            className="submit"
                            fullWidth
                            disableElevation
                            size="large"
                        >
                            Submit
                        </LoadingButton>
                        <LoadingButton
                            className="cancel"
                            variant="contained"
                            loading={loading}
                            onClick={onClose}
                            color="default"
                            disableElevation
                            size="large"
                        >
                            Cancel
                        </LoadingButton>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
