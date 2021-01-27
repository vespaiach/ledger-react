import { Popper, Grow, Paper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paperRoot: {
        overflow: 'auto',
        maxHeight: 300,
    },
}));

export default function MonthMenu({ months = [], open, onClose, onSelect, anchorEl }) {
    const classes = useStyles();
    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            onClose();
        }
    };

    return (
        <Popper
            style={{ zIndex: 1001 }}
            open={open}
            anchorEl={anchorEl}
            role={undefined}
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                    }}>
                    <Paper classes={{ root: classes.paperRoot }}>
                        <ClickAwayListener onClickAway={onClose}>
                            <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                                {months.map((m) => (
                                    <MenuItem
                                        key={`${m.year}-${m.month}`}
                                        value={`${m.year}-${m.month}`}
                                        onClick={() => onSelect(m)}>
                                        {m.name}, {m.year}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
