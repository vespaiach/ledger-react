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
    Badge,
    Divider,
} from '@material-ui/core';
import {
    MenuBookRounded as MenuBookRoundedIcon,
    SortRounded as SortRoundedIcon,
    SearchRounded as SearchRoundedIcon,
    MenuRounded as MenuRoundedIcon,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
    badge: {
        right: -3,
        top: 3,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
    lineHeight: {
        height: 24,
    },
}));

export default function PrivatePageShell({
    children,
    tabValue,
    onEdit,
    onSearch,
    onSort,
    searchingCount,
    sortingCount,
}) {
    const dispatch = useDispatch();
    const trigger = useScrollTrigger();
    const me = useSelector((state) => state.app.me);
    const classes = useStyles();

    useEffect(() => {
        if (!me) {
            dispatch({ type: 'Saga: fetch my account' });
        }
    }, [me, dispatch]);

    if (!me) {
        return <div style={{ height: '100vh' }} />;
    }

    let el = null;
    if (tabValue !== 2) {
        el = (
            <>
                <IconButton
                    aria-label="search transactions"
                    title="search transactions"
                    onClick={onSearch}>
                    <Badge
                        badgeContent={searchingCount}
                        classes={{ badge: classes.badge }}
                        color="secondary">
                        <SearchRoundedIcon />
                    </Badge>
                </IconButton>
                <IconButton
                    aria-label="sort transactions"
                    title="sort transactions"
                    onClick={onSort}>
                    <Badge
                        badgeContent={sortingCount}
                        classes={{ badge: classes.badge }}
                        color="secondary">
                        <SortRoundedIcon />
                    </Badge>
                </IconButton>
                <Divider
                    orientation="vertical"
                    variant="middle"
                    classes={{ root: classes.lineHeight }}
                />
            </>
        );
    }

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar color="default" classes={{ root: classes.appbarRoot }}>
                    <Toolbar>
                        <MenuBookRoundedIcon classes={{ root: classes.logoRoot }} />
                        <Typography variant="h6" className={classes.boxGrow}>
                            Ledger
                        </Typography>
                        {el}
                        <IconButton
                            edge="end"
                            aria-label="setting application"
                            title="setting application"
                            onClick={onEdit}>
                            <MenuRoundedIcon />
                        </IconButton>
                    </Toolbar>
                    <Tabs
                        classes={{ root: classes.tabsRoot }}
                        value={tabValue}
                        aria-label="simple tabs example"
                        variant="fullWidth">
                        <Tab
                            label="Incomes"
                            component={Link}
                            to="/portal/incomes"
                            classes={{ root: classes.tabRoot }}
                        />
                        <Tab
                            label="Expenses"
                            component={Link}
                            to="/portal/expenses"
                            classes={{ root: classes.tabRoot }}
                        />
                        <Tab
                            label="Reports"
                            component={Link}
                            to="/portal/reports"
                            classes={{ root: classes.tabRoot }}
                        />
                    </Tabs>
                </AppBar>
            </Slide>
            <Toolbar style={{ height: 112 }} />
            <Container maxWidth={false}>
                {children}
                <div style={{ height: 64 }} />
            </Container>
        </>
    );
}
