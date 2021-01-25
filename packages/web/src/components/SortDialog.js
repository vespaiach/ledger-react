import {
    Grid,
    FormLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    DialogTitle,
    DialogActions,
    Button,
    makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';

import DialogPanel from './DialogPanel';

const useStyles = makeStyles((theme) => ({
    boxSortContent: {
        padding: theme.spacing(4, 3, 3, 3),
    },
}));

export default function SortDialog({ open, date, amount, onClose, onApply, onReset }) {
    const classes = useStyles();
    const [byDate, setByDate] = useState(date);
    const [byAmount, setByAmount] = useState(amount);

    useEffect(() => {
        setByDate(date);
    }, [date, setByDate]);

    useEffect(() => {
        setByAmount(amount);
    }, [amount, setByAmount]);

    return (
        <DialogPanel
            open={open}
            onClose={onClose}
            aria-labelledby="sorting-dialog-title"
            title={<DialogTitle id="sorting-dialog-title">Transaction's Ordering</DialogTitle>}
            footer={
                <DialogActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => onApply({ byDate, byAmount })}
                        title="apply ordering">
                        Apply
                    </Button>
                    <Button size="small" color="primary" onClick={onReset} title="reset to default">
                        Reset
                    </Button>
                </DialogActions>
            }>
            <div className={classes.boxSortContent}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <FormLabel component="legend">By date</FormLabel>
                        <RadioGroup
                            aria-label="by date"
                            name="date"
                            value={byDate}
                            onChange={(evt) => setByDate(evt.target.value)}>
                            <FormControlLabel value="+" control={<Radio />} label="Ascending" />
                            <FormControlLabel value="-" control={<Radio />} label="Descending" />
                            <FormControlLabel value="" control={<Radio />} label="None" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel component="legend">By amount</FormLabel>
                        <RadioGroup
                            aria-label="by amount"
                            name="amount"
                            value={byAmount}
                            onChange={(evt) => setByAmount(evt.target.value)}>
                            <FormControlLabel value="+" control={<Radio />} label="Ascending" />
                            <FormControlLabel value="-" control={<Radio />} label="Descending" />
                            <FormControlLabel value="" control={<Radio />} label="None" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </div>
        </DialogPanel>
    );
}
