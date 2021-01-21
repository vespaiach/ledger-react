import {
    Tabs,
    Tab,
    AppBar,
    Toolbar,
    Typography,
    Container,
    IconButton,
    Slide,
    useScrollTrigger,
} from '@material-ui/core';
import {
    ExitToAppOutlined as ExitToAppOutlinedIcon,
    MenuBookOutlined as MenuBookOutlinedIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    appbarRoot: {
        boxShadow: 'none',
    },
    logoRoot: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.dark,
    },
    tabsRoot: {
        background: theme.palette.primary.dark,
    },
    tabRoot: {
        color: theme.palette.common.white,
    },
    boxGrow: {
        flexGrow: 1,
    },
}));

export default function PrivatePageShell({ children }) {
    const dispatch = useDispatch();
    const trigger = useScrollTrigger();
    const me = useSelector((state) => state.app.me);
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (!me) {
            dispatch({ type: 'Saga: fetch my account' });
        }
    }, [me, dispatch]);

    if (!me) {
        return <div style={{ height: '100vh' }} />;
    }

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar color="default" classes={{ root: classes.appbarRoot }}>
                    <Toolbar>
                        <MenuBookOutlinedIcon classes={{ root: classes.logoRoot }} />
                        <Typography variant="h6" className={classes.boxGrow}>
                            Ledger
                        </Typography>
                        <IconButton edge="end" aria-label="exit application">
                            <ExitToAppOutlinedIcon />
                        </IconButton>
                    </Toolbar>
                    <Tabs
                        classes={{ root: classes.tabsRoot }}
                        value={location.pathname}
                        aria-label="simple tabs example"
                        variant="fullWidth">
                        <Tab
                            label="Incomes"
                            value="/portal/incomes"
                            component={Link}
                            to="/incomes"
                            classes={{ root: classes.tabRoot }}
                        />
                        <Tab
                            label="Expenses"
                            value="/portal/expenses"
                            component={Link}
                            to="/expenses"
                            classes={{ root: classes.tabRoot }}
                        />
                        <Tab
                            label="Reports"
                            value="/portal/reports"
                            component={Link}
                            to="/reports"
                            classes={{ root: classes.tabRoot }}
                        />
                    </Tabs>
                </AppBar>
            </Slide>
            <Toolbar style={{ height: 104 }} />
            <Container maxWidth={false}>{children}</Container>
        </>
    );
}
