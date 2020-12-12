import {
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Popper,
    Paper,
    Grow,
    InputAdornment,
} from '@material-ui/core';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';

import ImageFilterIcon from '../components/Icons/ImageFilter';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    select: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    popper: {
        zIndex: 100,
        width: 308,
    },
    paper: {
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(1),
        },
    },
    icon: {
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(3),
    },
    buttons: {
        marginTop: theme.spacing(3),
        '& button + button': {
            marginLeft: theme.spacing(1),
        },
    },
    adornment: {
        color: theme.palette.text.disabled,
        height: 16,
    },
}));

export default function FilteringMenu({
    from,
    to,
    category = '',
    categories,
    open,
    numberOfFilter,
    anchorEleRef,
    onFilter,
    onClose,
}) {
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [cate, setCate] = useState(category);
    const classes = useStyles();

    return (
        <Popper
            open={open}
            anchorEl={anchorEleRef.current}
            transition
            disablePortal
            className={classes.popper}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                            placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                    }}
                >
                    <Paper classes={{ root: classes.paper }} elevation={3}>
                        <div className={classes.icon}>
                            <ImageFilterIcon number={numberOfFilter} />
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                clearable
                                size="small"
                                label="From date"
                                format="MMM do, yyyy HH:mm"
                                value={dateFrom}
                                onChange={(val) => {
                                    setDateFrom(val);
                                }}
                                inputVariant="filled"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            classes={{
                                                root: classes.adornment,
                                            }}
                                        >
                                            <CalendarTodayIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <DateTimePicker
                                clearable
                                size="small"
                                label="To date"
                                format="MMM do hh:mm aaaa"
                                value={dateTo}
                                onChange={(val) => {
                                    setDateTo(val);
                                }}
                                inputVariant="filled"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment
                                            position="end"
                                            classes={{
                                                root: classes.adornment,
                                            }}
                                        >
                                            <CalendarTodayIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <FormControl variant="filled" fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={cate}
                                onChange={(evt) => setCate(evt.target.value)}
                            >
                                {(categories || []).map((c) => (
                                    <MenuItem key={c.id} value={c.name}>
                                        {c.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={classes.buttons}>
                            <Button
                                onClick={() => {
                                    if (onFilter) {
                                        onFilter({
                                            to: dateTo,
                                            from: dateFrom,
                                            category: cate,
                                        });
                                    }
                                }}
                                color="primary"
                                variant="contained"
                                disableElevation
                            >
                                Apply
                            </Button>
                            <Button
                                onClick={onClose}
                                color="default"
                                disableElevation
                            >
                                Close
                            </Button>
                        </div>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
}
