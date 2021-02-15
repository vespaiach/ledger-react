import { Grid, Container, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
    MenuBookRounded as MenuBookRoundedIcon,
    ArrowRightAltRounded as ArrowRightAltRoundedIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.error.main,
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
    },
}));

export default function NotFound() {
    const classes = useStyles();

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        color="primary"
                        variant="h5"
                        component="h2"
                        classes={{ root: classes.title }}>
                        404 !
                    </Typography>
                    <Typography>Let's try:</Typography>
                    <ul>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        <li>
                            <Link to="/reports">Reports</Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    );
}
