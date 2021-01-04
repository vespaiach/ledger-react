import { Box, Typography, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    itemRoot: {
        paddingLeft: 2,
        paddingTop: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.text.disabled}`,
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
    },
    header: {
        marginBottom: theme.spacing(2),
    },
}));

export default function Header({ title, total = '$0' }) {
    const classes = useStyles();
    return (
        <ListItem classes={{ root: classes.itemRoot }}>
            <Typography variant="h6" color="secondary" classes={{ root: classes.header }}>
                {title}
            </Typography>
            <Box display="flex" alignItems="flex-end" width="100%">
                <Box flex="1" clone>
                    <Typography component="div" variant="caption">
                        Total
                    </Typography>
                </Box>
                <Box flex="1" clone>
                    <Typography component="div" variant="caption">
                        {total}
                    </Typography>
                </Box>
            </Box>
        </ListItem>
    );
}
