import { useDispatch } from 'react-redux';
import TransactionForm from '../../components/TransactionForm';

export default function Form({ id, amount, date, description, category, categories, onCancel, open }) {
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
            onCancel={onCancel}
            onSubmit={(payload) => {
                dispatch({
                    type: 'Saga: save income transation',
                    payload,
                });
            }}
        />
    );
}
