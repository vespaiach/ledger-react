import {
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

export default function SortDialog({ open, value, onClose, onApply, onReset }) {
    const classes = useStyles();
    const [order, setOrder] = useState(value);

    useEffect(() => {
        setOrder(order);
    }, [order, setOrder]);

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
                        onClick={() => onApply(order)}
                        title="apply ordering">
                        Apply
                    </Button>
                    <Button size="small" color="primary" onClick={onReset} title="reset to default">
                        Reset
                    </Button>
                </DialogActions>
            }>
            <div className={classes.boxSortContent}>
                <FormLabel component="legend">Sort</FormLabel>
                <RadioGroup
                    aria-label="by date"
                    name="date"
                    value={order}
                    onChange={(evt) => setOrder(evt.target.value)}>
                    <FormControlLabel
                        value="date"
                        control={<Radio />}
                        label="By date in ascending order"
                    />
                    <FormControlLabel
                        value="-date"
                        control={<Radio />}
                        label="By Date in descending order"
                    />
                    <FormControlLabel
                        value="amount"
                        control={<Radio />}
                        label="By amount in ascending order"
                    />
                    <FormControlLabel
                        value="-amount"
                        control={<Radio />}
                        label="By amount in descending order"
                    />
                    <FormControlLabel
                        value="category"
                        control={<Radio />}
                        label="By category in ascending order"
                    />
                    <FormControlLabel
                        value="-category"
                        control={<Radio />}
                        label="By category in descending order"
                    />
                </RadioGroup>
            </div>
        </DialogPanel>
    );
}
