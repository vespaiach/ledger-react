import { Dialog, useMediaQuery, Slide } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { forwardRef } from 'react';

const SlideUp = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialogScrollPaper: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(6),
        },
    },
    dialogPaperFullScreen: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
}));

export default function DialogPanel({ open, children, ...rest }) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useStyles();

    return (
        <Dialog
            {...rest}
            fullScreen={mobile}
            classes={{
                scrollPaper: classes.dialogScrollPaper,
                paperFullScreen: classes.dialogPaperFullScreen,
            }}
            open={open}
            TransitionComponent={mobile ? SlideUp : undefined}>
            {children}
        </Dialog>
    );
}
