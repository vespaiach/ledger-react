import { Grid } from '@material-ui/core';

import Chart from './Chart';

export default function MonthlyReport() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Chart height={180} incomeTotal={2020} expenseTotal={3200} />
            </Grid>
        </Grid>
    );
}
