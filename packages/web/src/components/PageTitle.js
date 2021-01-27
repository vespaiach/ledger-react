import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function PageTitle({ children }) {
    const classes = useStyles();
    return (
        <Typography variant="h6" classes={{ root: classes.titleRoot }} component="h3">
            {children}
        </Typography>
    );
}
