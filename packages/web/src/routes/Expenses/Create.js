import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Form from './Form';

export default function Create() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'Request: create expense' });
    }, [dispatch]);

    return (
        <Form
            amount=""
            date=""
            description=""
            category=""
            afterSuccess={() => history.push('/expenses')}
            onCancel={() => history.push('/expenses')}
        />
    );
}
