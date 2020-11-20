import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { styled } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    marginBottom: 28,
});
const ListHeader = styled('li')({
    fontWeight: 600,
    color: '#919eab',
    marginBottom: 12,
});
const ListItem = styled('li')({
    marginBottom: 6,
});
const LinkItem = styled(Link)({
    textDecoration: 'none',
    color: '#454f5b',
});
const ActionItem = styled('a')({
    textDecoration: 'none',
    color: '#454f5b',
});

export default function MasterPage({ children }) {
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        dispatch({ type: 'REQUEST_LOGOUT' });
    };
    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <List>
                        <ListHeader>REPORTS</ListHeader>
                        <ListItem>
                            <LinkItem to="/">Dashboard</LinkItem>
                        </ListItem>
                    </List>
                    <List>
                        <ListHeader>EXPENSES</ListHeader>
                        <ListItem>
                            <LinkItem to="/expenses">Transactions</LinkItem>
                        </ListItem>
                        <ListItem>
                            <LinkItem to="/expenses/new">Add New</LinkItem>
                        </ListItem>
                    </List>
                    <List>
                        <ListHeader style={{ marginTop: 20 }}>
                            INCOMES
                        </ListHeader>
                        <ListItem>
                            <LinkItem to="/incomes">Transactions</LinkItem>
                        </ListItem>
                        <ListItem>
                            <LinkItem to="/incomes/new">Add New</LinkItem>
                        </ListItem>
                    </List>
                    <List>
                        <ListHeader style={{ marginTop: 20 }}>
                            SETTINGS
                        </ListHeader>
                        <ListItem>
                            <ActionItem href="#" onClick={logout}>
                                Logout
                            </ActionItem>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    );
}
