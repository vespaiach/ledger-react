import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useLookupIcome(incomeId) {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.inForm.status);
    const id = useSelector((state) => state.inForm.id);
    const amount = useSelector((state) => state.inForm.amount);
    const date = useSelector((state) => state.inForm.date);
    const description = useSelector((state) => state.inForm.description);
    const category = useSelector((state) => state.inForm.category);

    useEffect(() => {
        if (incomeId && !isNaN(incomeId)) {
            dispatch({ type: 'Saga: fetch income detail', payload: parseInt(incomeId) });
        } else {
            // set add new mode
            dispatch({ type: 'Reducer - inForm: set ok status' });
        }
    }, [incomeId, dispatch]);

    return {
        status,
        id,
        amount,
        date,
        description,
        category,
    };
}
