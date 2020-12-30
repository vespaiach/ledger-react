import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    makeStyles,
    InputAdornment,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { CalendarToday as CalendarTodayIcon } from '@material-ui/icons';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useState } from 'react';

import BaseDialog from './BaseDialog';

let inc = 0;

const useStyles = makeStyles((theme) => ({
    dialog: {
        '& .MuiDialogContent-root': {
            paddingTop: 0,
            '& .MuiFormControl-root': {
                marginBottom: theme.spacing(1),
            },
        },
    },
    title: {
        color: theme.palette.secondary.main,
        padding: theme.spacing(4),
    },
    content: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    actions: {
        marginTop: theme.spacing(2),
        display: 'flex',
        '& button + button': {
            marginLeft: theme.spacing(1),
        },
        '& .submit': {
            flex: 1,
        },
    },
    radioGroup: {
        '& .radio-row': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiTypography-subtitle1': {
                width: 90,
            },
        },
    },
    secondText: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },
    buttons: {
        display: 'flex',
        marginTop: theme.spacing(3),
        '& button + button': {
            marginLeft: theme.spacing(1),
        },
        '& button': {
            flex: 1,
        },
    },
    adornment: {
        color: theme.palette.text.disabled,
        height: 16,
    },
}));

export default function SettingDialog({
    open,
    id = `setting-dialog-${inc++}`,
    categories,
    from,
    to,
    category,
    orderField,
    orderDirection,
    onClose,
    onSubmit,
    fullScreen,
    ...rest
}) {
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [cate, setCate] = useState(category);
    const [sort, setSort] = useState(`${orderDirection === 'desc' ? '-' : ''}${orderField}`);

    const classes = useStyles();
    return (
        <BaseDialog
            {...rest}
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            aria-labelledby={id}
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            className={classes.dialog}
        >
            <DialogTitle id={id} classes={{ root: classes.title }}>
                Filter and Sort Transations
            </DialogTitle>
            <DialogContent classes={{ root: classes.content }}>
                <DialogContentText>Apply filtering</DialogContentText>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        fullWidth
                        clearable
                        size="small"
                        label="From date"
                        format="MMM do, yyyy HH:mm"
                        value={dateFrom}
                        onChange={(val) => {
                            setDateFrom(val);
                        }}
                        inputVariant="filled"
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
                        fullWidth
                        clearable
                        size="small"
                        label="To date"
                        format="MMM do hh:mm aaaa"
                        value={dateTo}
                        onChange={(val) => {
                            setDateTo(val);
                        }}
                        inputVariant="filled"
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
                <FormControl variant="filled" size="small" fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={cate} onChange={(evt) => setCate(evt.target.value)}>
                        {(categories || []).map((c) => (
                            <MenuItem key={c.id} value={c.name}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <DialogContentText classes={{ root: classes.secondText }}>Apply sorting</DialogContentText>
                <RadioGroup
                    classes={{ root: classes.radioGroup }}
                    aria-label="date"
                    name="date"
                    value={sort}
                    dir="v"
                    onChange={(evt) => setSort(evt.target.value)}
                >
                    <div className="radio-row">
                        <Typography variant="subtitle1">Date:</Typography>
                        <FormControlLabel value="date" control={<Radio />} label="asc" />
                        <FormControlLabel value="-date" control={<Radio />} label="desc" />
                    </div>
                    <div className="radio-row">
                        <Typography variant="subtitle1">Amount:</Typography>
                        <FormControlLabel value="amount" control={<Radio />} label="asc" />
                        <FormControlLabel value="-amount" control={<Radio />} label="desc" />
                    </div>
                    <div className="radio-row">
                        <Typography variant="subtitle1">Category:</Typography>
                        <FormControlLabel value="category" control={<Radio />} label="asc" />
                        <FormControlLabel value="-category" control={<Radio />} label="desc" />
                    </div>
                </RadioGroup>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        disableElevation
                        size="large"
                        color="primary"
                        onClick={() => {
                            onSubmit({
                                lookup: {
                                    dateFrom: from,
                                    dateTo: to,
                                    category: cate,
                                },
                                sort: {
                                    field: sort[0] === '-' ? sort.substr(1) : sort,
                                    direction: sort[0] === '-' ? 'desc' : 'asc',
                                },
                            });
                        }}
                    >
                        Apply
                    </Button>
                    <Button disableElevation size="large" variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </BaseDialog>
    );
}
