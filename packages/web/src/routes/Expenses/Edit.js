import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Form from './Form';

export default function Prefetch() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const editing = useSelector((state) => state.expenses.editing);

    useEffect(() => {
        if (!editing || editing.id !== Number(id)) {
            dispatch({ type: 'Request: edit expense', payload: id });
        }
    }, [editing, dispatch, id]);

    if (!editing) {
        return <div />;
    }

    return (
        <Form
            id={id}
            amount={editing.amount}
            date={editing.date}
            description={editing.description}
            category={editing.category}
            title="New Expenses Transaction"
            afterSuccess={() => history.push('/expenses')}
            onCancel={() => history.push('/expenses')}
        />
    );
}
