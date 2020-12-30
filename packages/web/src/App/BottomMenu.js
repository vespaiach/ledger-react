import { BottomNavigationAction, BottomNavigation } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MeetingRoom } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PollIcon from '../components/Icons/Poll';
import TextBoxMinusIcon from '../components/Icons/TextBoxMinus';
import TextBoxPlusIcon from '../components/Icons/TextBoxPlus';

const useStyles = makeStyles((theme) => ({
    botNav: {
        position: 'fixed',
        bottom: 0,
        transform: 'none',
        boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)',
        height: 68,
        color: 'rgba(0,0,0,.6)',
        width: '100vw',
    },
}));

export default function BottomMenu({ className }) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const goto = (_, val) => {
        if (val === 'exit') {
            dispatch({ type: 'Saga: force relogin' });
            return;
        }
        history.push(val);
    };

    return (
        <BottomNavigation
            classes={{ root: classes.botNav }}
            className={className}
            onChange={goto}
            value={location.pathname}
        >
            <BottomNavigationAction label="Recents" icon={<PollIcon />} value="/portal/reports" />
            <BottomNavigationAction label="Expenses" icon={<TextBoxMinusIcon />} value="/portal/expenses" />
            <BottomNavigationAction label="Incomes" icon={<TextBoxPlusIcon />} value="/portal/incomes" />
            <BottomNavigationAction label="Exit" icon={<MeetingRoom />} value="exit" />
        </BottomNavigation>
    );
}
