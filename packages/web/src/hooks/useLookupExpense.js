import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useLookupExpense(expenseId) {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.exForm.status);
    const id = useSelector((state) => state.exForm.id);
    const amount = useSelector((state) => state.exForm.amount);
    const date = useSelector((state) => state.exForm.date);
    const description = useSelector((state) => state.exForm.description);
    const category = useSelector((state) => state.exForm.category);

    useEffect(() => {
        if (expenseId && !isNaN(expenseId)) {
            dispatch({ type: 'Saga: fetch expense detail', payload: parseInt(expenseId) });
        } else {
            // set add new mode
            dispatch({ type: 'Reducer - exForm: set ok status' });
        }
    }, [expenseId, dispatch]);

    return {
        status,
        id,
        amount,
        date,
        description,
        category,
    };
}
