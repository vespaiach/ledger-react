import { useDispatch, useSelector } from 'react-redux';
import TransactionForm from '../../components/TransactionForm';

export default function Form({ open, fullScreen }) {
    const id = useSelector((state) => state.exTrans.id);
    const date = useSelector((state) => state.exTrans.date);
    const amount = useSelector((state) => state.exTrans.amount);
    const description = useSelector((state) => state.exTrans.description);
    const category = useSelector((state) => state.exTrans.category);
    const categories = useSelector((state) => state.inCates.list);
    const loading = useSelector((state) => state.exTrans.saving);

    const dispatch = useDispatch();
    const title = id ? 'Edit an Expense Transacation' : 'Create a New Expense Transaction';

    return (
        <TransactionForm
            id={id}
            amount={amount}
            date={date}
            description={description}
            category={category}
            categories={categories}
            title={title}
            open={open}
            loading={loading}
            fullScreen={fullScreen}
            onCancel={() => {
                dispatch({ type: 'Reducer - exTrans: clear all expense data' });
                dispatch({ type: 'Reducer - exTrans: close form dialog' });
            }}
            onSubmit={(payload) => {
                dispatch({
                    type: 'Saga - ex: save expense transation',
                    payload,
                });
            }}
        />
    );
}
