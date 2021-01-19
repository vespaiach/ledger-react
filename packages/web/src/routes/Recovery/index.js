import { Grid, Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';

import PublicPageShell from '../../components/PublicPageShell';
import ChangePass from './ChangePass';
import RequestChange from './RequestChange';

export default function Signin() {
    const dispatch = useDispatch();
    const location = useLocation();
    const token = useMemo(() => new URLSearchParams(location.search).get('token'), [
        location.search,
    ]);

    useEffect(() => {
        if (token) {
            dispatch({ type: 'Reducer - recovery: set status loading' });
        } else {
            dispatch({ type: 'Reducer - recovery: reset' });
        }
    }, [token, dispatch]);

    const el = token ? <ChangePass token={token} /> : <RequestChange />;

    return (
        <PublicPageShell imgSrc="/signup.jpg">
            <Container>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} sm={5}>
                        {el}
                    </Grid>
                </Grid>
            </Container>
        </PublicPageShell>
    );
}
