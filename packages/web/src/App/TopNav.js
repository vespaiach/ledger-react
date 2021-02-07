import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import {
    MenuBookRounded as MenuBookRoundedIcon,
    SettingsRounded as SettingsRoundedIcon,
    MenuRounded as MenuRoundedIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appbarRoot: {
        background: 'white',
        color: theme.palette.text.primary,
    },
    logoRoot: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.dark,
    },
    tabsRoot: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'stretch',
        height: 48,
        marginLeft: theme.spacing(8),
        '& a': {
            color: theme.palette.common.black,
            textDecoration: 'none',
            fontSize: theme.typography.body1.fontSize,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        '& a + a': {
            marginLeft: theme.spacing(4),
        },
        '& .active::after': {
            display: 'block',
            height: 2,
            width: 20,
            bottom: 0,
            left: 0,
            background: 'red',
            content: ' ',
            position: 'absolute',
        },

        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    settingMenuRoot: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    hamburgerMenuRoot: {
        display: 'none',
        marginLeft: 'auto',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    subMenu: {
        minHeight: 48,
        background: theme.palette.primary.dark,
    },
}));

export default function TopNav() {
    const classes = useStyles();
    return (
        <AppBar classes={{ root: classes.appbarRoot }}>
            <Toolbar variant="dense">
                <MenuBookRoundedIcon classes={{ root: classes.logoRoot }} />
                <Typography variant="h6">Ledger</Typography>
                <div className={classes.tabsRoot}>
                    <Link to="/transactions" className="active">
                        Transactions
                    </Link>
                    <Link to="/reports">Reports</Link>
                </div>
                <IconButton
                    classes={{ root: classes.settingMenuRoot }}
                    edge="end"
                    aria-label="account menu"
                    aria-controls="account-menu"
                    title="account menu"
                    aria-haspopup="true">
                    <SettingsRoundedIcon />
                </IconButton>
                <IconButton
                    classes={{ root: classes.hamburgerMenuRoot }}
                    edge="end"
                    aria-label="account menu"
                    aria-controls="account-menu"
                    title="account menu"
                    aria-haspopup="true">
                    <MenuRoundedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
