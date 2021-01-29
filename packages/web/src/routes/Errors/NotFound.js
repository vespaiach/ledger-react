import {
    ListItemIcon,
    List,
    ListItem,
    ListItemText,
    Container,
    Paper,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    MenuBookRounded as MenuBookRoundedIcon,
    ArrowRightAltRounded as ArrowRightAltRoundedIcon,
} from '@material-ui/icons';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
    },
    btn: {
        '& .MuiButtonBase-root': {
            marginRight: theme.spacing(2),
        },
    },
    containerRoot: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'white',
        paddingTop: theme.spacing(2),
    },
    err404Root: {
        color: theme.palette.error.dark,
        marginBottom: theme.spacing(2),
    },
    logo: {
        marginBottom: theme.spacing(6),
        color: theme.palette.primary.dark,
        '& svg': {
            height: 48,
            width: 48,
        },
    },
}));

export default function NotFound() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Container classes={{ root: classes.containerRoot }} maxWidth={false}>
            <Paper classes={{ root: classes.paper }} elevation={0}>
                <Typography variant="h5" classes={{ root: classes.logo }}>
                    <MenuBookRoundedIcon />
                </Typography>
                <Typography variant="h5" classes={{ root: classes.err404Root }}>
                    <span>404</span> | Are you lost?
                </Typography>
                <Typography>Let's get back on track with:</Typography>
                <List className={classes.btn}>
                    <ListItem button component={Link} to="/portal/incomes">
                        <ListItemIcon>
                            <ArrowRightAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Incomes" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/expenses')}>
                        <ListItemIcon>
                            <ArrowRightAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Expenses" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/monthly_reports')}>
                        <ListItemIcon>
                            <ArrowRightAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/signin')}>
                        <ListItemIcon>
                            <ArrowRightAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign in" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/signup')}>
                        <ListItemIcon>
                            <ArrowRightAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign up" />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
}
