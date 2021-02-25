/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import {
    AppBar,
    Dialog,
    IconButton,
    Typography,
    Slide,
    Toolbar,
    Button,
    SlideProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { forwardRef, ReactElement, ReactNode } from 'react';
import { CloseRounded as CloseRoundedIcon } from '@material-ui/icons';
import clsx from 'clsx';

const SlideUp = forwardRef(function Transition(props: SlideProps, ref) {
    return <Slide direction="up" ref={ref} children={props.children} />;
});

const useStyles = makeStyles({
    dialogTitleRoot: {
        textAlign: 'center',
        flexGrow: 1,
        fontWeight: 600,
    },
    btnCloseRoot: {
        color: 'white',
    },
    dialogScrollPaper: {
        flexFlow: 'column nowrap',
    },
    btnReset: {
        padding: 0,
    },
    hidden: {
        visibility: 'hidden',
    },
});

interface DialogPanelProps {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
    onReset?: () => void;
}

export default function DialogPanel({ open, title, children, onClose, onReset }: DialogPanelProps) {
    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={SlideUp}>
            <AppBar position="static" color="transparent" elevation={3}>
                <Toolbar variant="dense">
                    <IconButton edge="start" onClick={onClose} color="default" aria-label="menu">
                        <CloseRoundedIcon />
                    </IconButton>
                    <Typography
                        classes={{ root: classes.dialogTitleRoot }}
                        variant="subtitle1"
                        color="primary">
                        {title}
                    </Typography>
                    <Button
                        disableRipple
                        variant="text"
                        className={clsx(!onReset && classes.hidden)}
                        classes={{ root: classes.btnReset }}
                        onClick={(evt) => {
                            evt.stopPropagation();
                            if (onReset) {
                                onReset();
                            }
                        }}>
                        Reset
                    </Button>
                </Toolbar>
            </AppBar>
            {children}
        </Dialog>
    );
}
