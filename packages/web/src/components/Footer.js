import { Typography } from '@material-ui/core';

export default function Footer({ className }) {
    return (
        <footer className={className}>
            <Typography color="textSecondary" aria-label="copyright 2021 by vespaiach">
                <a href="mailto:nta.toan@gmail.com" title="mail to vespaiach">
                    vespaich
                </a>{' '}
                © 2021
            </Typography>
        </footer>
    );
}
