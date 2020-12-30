import { forwardRef } from 'react';
import { Dialog, Slide, Fade } from '@material-ui/core';

const SlideUpTransition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = forwardRef(function Transition(props, ref) {
    return <Fade ref={ref} {...props} />;
});

export default function BaseDialog({ fullScreen, children, ...props }) {
    return (
        <Dialog
            {...props}
            fullScreen={fullScreen}
            TransitionComponent={fullScreen ? SlideUpTransition : FadeTransition}
        >
            {children}
        </Dialog>
    );
}
