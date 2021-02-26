import { IconButton, makeStyles, Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';

import { AppBusyCode, AppMessageCode, AppRootState } from '../types.d';
import { clearMessageAction } from '../actions/system';

const useStyles = makeStyles((theme) => ({
    successSnackbar: {
        '& .MuiSnackbarContent-root': {
            background: theme.palette.success.main,
        },
    },
}));

function getMessage(code: AppMessageCode | null): string {
    switch (code) {
        case AppMessageCode.AuthorizedFailure:
            return 'You need to sign in to continue';
        case AppMessageCode.CreateTransactionFailure:
            return 'Created transaction unsuccessfully';
        case AppMessageCode.UpdateTransactionFailure:
            return 'Updated transaction unsuccessfully';
        case AppMessageCode.DeleteTransactionFailure:
            return 'Deleted transaction unsuccessfully';
        case AppMessageCode.InternalServerFailure:
            return 'Server got error';
        case AppMessageCode.QueryTransactionFailure:
            return 'Query transaction unsuccessfully';
        case AppMessageCode.NetworkError:
            return 'Network error';
        case AppMessageCode.ValidationFailure:
            return 'Your data validation failed';
        case AppMessageCode.WrongCredentialFailure:
            return 'Your credentials was wrong';
        case AppMessageCode.CreateTrasactionSuccess:
            return 'Created transaction successfully';
        case AppMessageCode.UpdateTransactionSuccess:
            return 'Updated transaction successfully';
        case AppMessageCode.DeleteTransactionSuccess:
            return 'Deleted transaction successfully';
        case AppMessageCode.SignoutSuccess:
            return 'You have been signed out';
        case AppMessageCode.UnknownError:
            return 'Unexpected error occurred';
        default:
            return '';
    }
}

export default function Alert() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const messageCode = useSelector<AppRootState, AppMessageCode | null>(
        (state) => state.wholeApp.messageCode
    );
    const busyCode = useSelector<AppRootState, AppBusyCode>((state) => state.wholeApp.busyCode);

    const handleClose = () => dispatch(clearMessageAction());

    return (
        <>
            <Snackbar
                classes={{ root: classes.successSnackbar }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={5000}
                open={busyCode === AppBusyCode.Idle && messageCode !== null}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                }
                message={getMessage(messageCode)}
                onClose={handleClose}
            />
            <Snackbar
                open={busyCode !== AppBusyCode.Idle}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={
                    <>
                        {AppBusyCode.Loading
                            ? 'Loading data'
                            : AppBusyCode.Saving
                            ? 'Saving data'
                            : ''}
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </>
                }
            />
        </>
    );
}
