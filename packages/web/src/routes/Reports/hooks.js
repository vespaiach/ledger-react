import { useMemo } from 'react';

export function useMonthlyReport({ transactions, year, month }) {
    return useMemo(() => {
        const aggregateMonthlyIncome = {};
        const aggregateMonthlyExpense = {};
        let totalMonthlyIncome = 0;
        let totalMonthlyExpense = 0;
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month, 1);
        lastDayOfMonth.setMonth(month + 1);

        transactions.forEach((tran) => {
            if (tran.date >= firstDayOfMonth && tran.date < lastDayOfMonth) {
                if (tran.transactionType === 'in') {
                    aggregateMonthlyIncome[tran.category] =
                        aggregateMonthlyIncome[tran.category] || 0;
                    aggregateMonthlyIncome[tran.category] += tran.amount;
                    totalMonthlyIncome += tran.amount;
                } else {
                    aggregateMonthlyExpense[tran.category] =
                        aggregateMonthlyExpense[tran.category] || 0;
                    aggregateMonthlyExpense[tran.category] += tran.amount;
                    totalMonthlyExpense += tran.amount;
                }
            }
        });

        return {
            income: {
                list: Object.entries(aggregateMonthlyIncome).map(([k, v]) => ({
                    name: k,
                    total: v,
                })),
                total: totalMonthlyIncome,
            },
            expense: {
                list: Object.entries(aggregateMonthlyExpense).map(([k, v]) => ({
                    name: k,
                    total: v,
                })),
                total: totalMonthlyExpense,
            },
        };
    }, [transactions, year, month]);
}
