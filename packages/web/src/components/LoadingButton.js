/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: 'calc(50% - 6px)',
        left: 'calc(50% - 6px)',
    },
});

export default function LoadingButton({ loading, children, ...rest }) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Button {...rest} disabled={loading}>
                {children}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}
