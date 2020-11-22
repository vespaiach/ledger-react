import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Menu from './Menu';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'stretch',
    },
    content: {
        width: '100%',
        minHeight: '100vh',
        background: theme.palette.background.paper,
        paddingLeft: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    mainGrid: {
        margin: `0 ${theme.spacing(8)}px`,
    },
}));

export default function BasePage({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Menu />
            <Container
                maxWidth={false}
                component="main"
                classes={{ root: classes.content }}
            >
                {children}
            </Container>
        </div>
    );
}

BasePage.propTypes = {
    children: PropTypes.node.isRequired,
};
