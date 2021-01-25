import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    boxNoResult: {
        marginTop: theme.spacing(6),
    },
    titleRoot: {
        marginBottom: theme.spacing(1),
    },
    btnRoot: {
        marginTop: theme.spacing(3),
    },
}));

export default function NoResult({ hasFilter, onClear, onAdd }) {
    const classes = useStyles();
    return (
        <div className={classes.boxNoResult}>
            <Typography variant="h6" classes={{ root: classes.titleRoot }}>
                No results
            </Typography>
            {hasFilter ? (
                <>
                    <Typography variant="body1">
                        Try adjusting your search by changing your dates, your category or removing
                        filters.
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={onClear}
                        classes={{ root: classes.btnRoot }}>
                        Clear filters
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="body1">
                        You can use the adding form to add new transactions.
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        onClick={onAdd}
                        classes={{ root: classes.btnRoot }}>
                        Add New Transaction
                    </Button>
                </>
            )}
        </div>
    );
}
