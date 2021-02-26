/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { Fade, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useMemo, useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    bgImgMain: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    bgImgTemporary: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiLinearProgress-root': {
            width: '20%',
        },
    },
}));

export default function LazyBackgroundImage({ src, ssrc, children, className }) {
    const classes = useStyles();
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState('');
    const style = useMemo(() => {
        if (status === 'done') {
            return { backgroundImage: `url(${src})` };
        }
        return null;
    }, [status, src]);
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.onprogress = (evt) => {
            setPercent(Math.floor((evt.loaded / evt.total) * 100));
            setStatus('loading');
        };
        xhr.onload = () => {
            setPercent(100);
            if (xhr.status !== 200) {
                setStatus('fail');
            } else {
                setStatus('done');
            }
        };
        xhr.error = () => {
            setPercent(100);
            setStatus('fail');
        };
        xhr.open('GET', src, true);
        xhr.send();
    }, [src]);

    let el;
    if (children && typeof children === 'function') {
        el = children({ percent, status });
    } else {
        el = status === 'loading' ? <LinearProgress value={percent} variant="determinate" /> : null;
    }

    return (
        <div className={clsx(classes.bgImgMain, className)} style={style}>
            <Fade in={!style} timeout={{ enter: 0, exit: 3000 }}>
                <div className={classes.bgImgTemporary} style={{ backgroundImage: `url(${ssrc})` }}>
                    {el}
                </div>
            </Fade>
        </div>
    );
}
