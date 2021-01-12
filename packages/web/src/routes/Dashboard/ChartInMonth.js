import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

import { formatCurrency } from "../../utils/format";
import { useMemo } from "react";

const useStyles = makeStyles((theme) => ({
    chart: {
        minHeight: theme.spacing(22),
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
    },
    expense: {
        display: "flex",
        flex: "1",
        borderRight: `1px dotted ${blueGrey[100]}`,
        flexFlow: "column-reverse nowrap",
        paddingRight: theme.spacing(2),
        alignItems: "flex-end",
    },
    expenseBar: {
        background: "#6e608b",
        width: theme.spacing(5),
        transition: "height 2s ease",
        height: 0,
    },
    expenseText: {
        fontSize: "0.8rem",
        "& p:first-child": {
            color: "#6e608b",
            fontWeight: 600,
            margin: "4px 0 0 0",
            textAlign: "right",
        },
        "& p:last-child": {
            margin: 0,
            fontStyle: "italic",
            textAlign: "right",
            color: theme.palette.text.disabled,
        },
    },
    incomeBar: {
        background: "#608b84",
        width: theme.spacing(5),
        transition: "height 2s ease",
        height: 0,
    },
    incomeText: {
        fontSize: "0.8rem",
        "& p:first-child": {
            color: "#608b84",
            fontWeight: 600,
            margin: "4px 0 0 0",
        },
        "& p:last-child": {
            margin: 0,
            fontStyle: "italic",
            color: theme.palette.text.disabled,
        },
    },
    income: {
        display: "flex",
        flex: "1",
        flexFlow: "column-reverse nowrap",
        marginLeft: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(1),
        color: theme.palette.secondary.main,
    },
    header: {
        display: "flex",
        alignItems: "center",
    },
}));

export default function ChartInMonth({ expenses, incomes, height = 0, month }) {
    const heights = useMemo(() => {
        if ((expenses === 0 && incomes === 0) || height === 0) {
            return 0;
        }

        const extra = 50; // is the height of bar chart's legend
        const ratio =
            expenses > incomes
                ? (height - extra) / expenses
                : (height - extra) / incomes;
        return {
            incomes: incomes * ratio,
            expenses: expenses * ratio,
        };
    }, [expenses, incomes, height]);
    const classes = useStyles();

    return (
        <div className={classes.chart} style={{ height }}>
            <div className={classes.expense}>
                <div className={classes.expenseText}>
                    <p>EXPENSES</p>
                    <p>{formatCurrency(expenses)}</p>
                </div>
                <div
                    className={classes.expenseBar}
                    style={{ height: heights.expenses }}></div>
            </div>
            <div className={classes.income}>
                <div className={classes.incomeText}>
                    <p>INCOMES</p>
                    <p>{formatCurrency(incomes)}</p>
                </div>
                <div
                    className={classes.incomeBar}
                    style={{ height: heights.incomes }}></div>
            </div>
        </div>
    );
}
