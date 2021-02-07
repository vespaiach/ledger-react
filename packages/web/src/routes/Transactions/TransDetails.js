import {
    ListItem,
    ListItemText,
    ListItemIcon,
    List,
    Container,
    Grid,
    IconButton,
} from '@material-ui/core';
import {
    CalendarTodayRounded as CalendarTodayRoundedIcon,
    QueryBuilderRounded as QueryBuilderRoundedIcon,
    DescriptionRounded as DescriptionRoundedIcon,
    CategoryRounded as CategoryRoundedIcon,
    AttachMoneyRounded as AttachMoneyRoundedIcon,
    EditRounded as EditRoundedIcon,
    DeleteForeverRounded as DeleteRoundedIcon,
} from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import DialogPanel from '../../components/DialogPanel';

const useStyles = makeStyles((theme) => ({
    infoPanel: {
        background: 'rgba(0,0,0,0.07)',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    btns: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export default function TransDetails({ detail, onClose, onEdit, onDelete }) {
    const classes = useStyles();

    let el = <div />;
    if (detail) {
        el = (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <AttachMoneyRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <NumberFormat
                            value={detail.amount}
                            displayType={'text'}
                            thousandSeparator={true}
                        />
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CalendarTodayRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={format(detail.date, 'LLL do, yyyy')} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <QueryBuilderRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={format(detail.date, 'HH:mm')} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <CategoryRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={detail.category} />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <DescriptionRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={detail.description} />
                </ListItem>
            </List>
        );
    }

    return (
        <DialogPanel title="Transaction Details" open={Boolean(detail)} onClose={onClose}>
            <Container classes={{ root: classes.infoPanel }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {el}
                    </Grid>
                </Grid>
            </Container>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} classes={{ root: classes.btns }}>
                        <IconButton
                            aria-label="edit income transaction"
                            color="primary"
                            onClick={() => {
                                onEdit(detail);
                            }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete income transaction"
                            color="primary"
                            onClick={() => {
                                onDelete(detail);
                            }}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Container>
        </DialogPanel>
    );
}
