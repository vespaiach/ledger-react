import { ListItemIcon, List, ListItem, ListItemText, Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { ArrowRightAlt } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 600,
    },
    img: {
        width: '100%',
    },
    btn: {
        '& .MuiButtonBase-root': {
            marginRight: theme.spacing(2),
        },
    },
    text: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
}));

export default function NotFound() {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Container>
            <Paper classes={{ root: classes.paper }} elevation={0}>
                <img className={classes.img} src="/notfound.svg" alt="404 page not found" />
                <Typography className={classes.text}>Looks like you are lost. Let's get on track with:</Typography>
                <List className={classes.btn}>
                    <ListItem button onClick={() => history.push('/portal/reports')}>
                        <ListItemIcon>
                            <ArrowRightAlt />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/expenses')}>
                        <ListItemIcon>
                            <ArrowRightAlt />
                        </ListItemIcon>
                        <ListItemText primary="Expenses" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/incomes')}>
                        <ListItemIcon>
                            <ArrowRightAlt />
                        </ListItemIcon>
                        <ListItemText primary="Incomes" />
                    </ListItem>
                    <ListItem button onClick={() => history.push('/portal/login')}>
                        <ListItemIcon>
                            <ArrowRightAlt />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItem>
                </List>
            </Paper>
        </Container>
    );
}
