import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

export default function PrivateRoute({ children, path, ...rest }) {
    const me = useSelector((state) => state.user.me);
    const dispatch = useDispatch();

    if (!me) {
        dispatch({ type: 'VERIFY_LOGIN' });
    }

    return (
        <Route
            {...rest}
            exact
            path={path}
            render={() => (me ? children : <div />)}
        />
    );
}
