import { useDispatch, useSelector } from 'react-redux';
import TransactionForm from '../../components/TransactionForm';

export default function Form({ open, fullScreen }) {
    const id = useSelector((state) => state.inTrans.id);
    const date = useSelector((state) => state.inTrans.date);
    const amount = useSelector((state) => state.inTrans.amount);
    const description = useSelector((state) => state.inTrans.description);
    const category = useSelector((state) => state.inTrans.category);
    const categories = useSelector((state) => state.inCates.list);
    const loading = useSelector((state) => state.inTrans.saving);

    const dispatch = useDispatch();
    const title = id ? 'Edit an Income Transacation' : 'Create a New Income Transaction';

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
                dispatch({ type: 'Reducer - inTrans: clear all income data' });
                dispatch({ type: 'Reducer - inTrans: close form dialog' });
            }}
            onSubmit={(payload) => {
                dispatch({
                    type: 'Saga - in: save income transation',
                    payload,
                });
            }}
        />
    );
}
