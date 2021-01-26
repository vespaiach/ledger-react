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
    MenuItem,
    ListItemIcon,
    Paper,
    ClickAwayListener,
    Grow,
    Popper,
    MenuList,
} from '@material-ui/core';
import {
    MenuBookRounded as MenuBookRoundedIcon,
    SortRounded as SortRoundedIcon,
    SearchRounded as SearchRoundedIcon,
    PersonOutlineRounded as PersonOutlineRoundedIcon,
    VpnKeyRounded as VpnKeyRoundedIcon,
    PowerSettingsNewRounded as PowerSettingsNewRoundedIcon,
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';

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
        right: -2,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
    lineHeight: {
        height: 24,
    },
    userInfo: {
        flexFlow: 'column nowrap',
        margin: theme.spacing(2, 2, 3, 2),
    },
}));

export default function PrivatePageShell({
    children,
    tabValue,
    userName,
    userEmail,
    onSearch,
    onSort,
    onExit,
    onChangePass,
    searchingCount,
}) {
    const dispatch = useDispatch();
    const trigger = useScrollTrigger();
    const me = useSelector((state) => state.app.me);
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    const btnAnchorRef = useRef(null);

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    };

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
                    <Badge variant="dot" color="secondary">
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
                            aria-label="account menu"
                            aria-controls="account-menu"
                            title="account menu"
                            aria-haspopup="true"
                            ref={btnAnchorRef}
                            onClick={() => setOpenMenu(true)}>
                            <PersonOutlineRoundedIcon />
                        </IconButton>
                        <Popper
                            style={{ zIndex: 1001 }}
                            open={openMenu}
                            anchorEl={btnAnchorRef.current}
                            role={undefined}
                            transition
                            disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin:
                                            placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}>
                                    <Paper>
                                        <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
                                            <MenuList
                                                autoFocusItem={openMenu}
                                                onKeyDown={handleListKeyDown}>
                                                <MenuItem
                                                    classes={{ root: classes.userInfo }}
                                                    role={undefined}>
                                                    <Typography variant="subtitle2">
                                                        Hi, I'm {userName}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {userEmail}
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={onChangePass}>
                                                    <ListItemIcon>
                                                        <VpnKeyRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="inherit">
                                                        Change password
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={onExit}>
                                                    <ListItemIcon>
                                                        <PowerSettingsNewRoundedIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    <Typography variant="inherit">
                                                        Sign out
                                                    </Typography>
                                                </MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
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
