import {
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Popper,
    Paper,
    Grow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

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
            marginBottom: theme.spacing(2),
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
}));

export default function FilteringMenu({
    from,
    to,
    category = '',
    categories,
    open,
    numberOfFilter,
    anchorEleRef,
    onChange,
    onClear,
    onClose,
}) {
    const classes = useStyles();
    const handleChange = (name) => (date) => {
        if (onChange) {
            onChange(date, name);
        }
    };

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
                            <FormControl fullWidth>
                                <DateTimePicker
                                    size="small"
                                    inputVariant="filled"
                                    label="From date"
                                    format="MMM do hh:mm aaaa"
                                    value={from}
                                    onChange={handleChange('from')}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <DateTimePicker
                                    size="small"
                                    inputVariant="filled"
                                    label="To date"
                                    format="MMM do hh:mm aaaa"
                                    value={to}
                                    onChange={handleChange('to')}
                                />
                            </FormControl>
                        </MuiPickersUtilsProvider>
                        <FormControl variant="filled" fullWidth size="small">
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category || ''}
                                onChange={(evt) =>
                                    handleChange('category')(evt.target.value)
                                }
                            >
                                {(categories || []).map((c) => (
                                    <MenuItem key={c} value={c}>
                                        {c}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={classes.buttons}>
                            <Button
                                onClick={onClear}
                                color="default"
                                variant="contained"
                                disableElevation
                            >
                                Clear All
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
