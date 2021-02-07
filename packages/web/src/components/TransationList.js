import { List, ListItem, Typography, IconButton, Divider } from '@material-ui/core';
import {
    EditRounded as EditRoundedIcon,
    DeleteForeverRounded as DeleteRoundedIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AutoSizer, List as VirtualList, WindowScroller } from 'react-virtualized';
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    listRoot: {
        width: '100%',
        minWidth: 320,
    },
    boxMid: {
        marginLeft: theme.spacing(2),
        flex: '0 0 198px',
        width: 168,
    },
    boxGrow: {
        flexGrow: 1,
    },
    boxDesc: {
        marginLeft: theme.spacing(3),
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    boxBtns: {
        flex: '0 0 96px',
        marginLeft: theme.spacing(3),
    },
    boxBtnsSkeleton: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
        '& .MuiSkeleton-circle + .MuiSkeleton-circle': {
            marginLeft: theme.spacing(3),
        },
    },
}));

export default function TransactionList({ onEdit, onDelete, onDetail, data, totalRows }) {
    const classes = useStyles();
    const rowRenderer = ({ index, style, key }) => {
        return (
            <div key={key} style={style}>
                <ListItem
                    alignItems="flex-start"
                    disableGutters
                    button
                    onClick={() => onDetail(data[index])}>
                    <Typography variant="h6">{`$`}</Typography>
                    <div className={classes.boxMid}>
                        <Typography variant="h6">
                            <NumberFormat
                                value={data[index].amount}
                                displayType={'text'}
                                thousandSeparator={true}
                            />
                        </Typography>
                        <Typography variant="body2">
                            {format(data[index].date, 'LLL do, yyyy')} -{' '}
                            {format(data[index].date, 'HH:mm')}
                        </Typography>
                    </div>
                    <div className={classes.boxDesc}>
                        <Typography variant="h6">{data[index].category}</Typography>
                        <Typography variant="body2" noWrap classes={{ root: classes.typoEllipsis }}>
                            {data[index].description}
                        </Typography>
                    </div>
                    <div className={classes.boxGrow} />
                    <div className={classes.boxBtns}>
                        <IconButton
                            aria-label="edit income transaction"
                            onClick={(evt) => {
                                evt.stopPropagation();
                                onEdit(data[index]);
                            }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton
                            aria-label="delete income transaction"
                            onClick={(evt) => {
                                evt.stopPropagation();
                                onDelete(data[index]);
                            }}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </div>
                </ListItem>
                <Divider />
            </div>
        );
    };

    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <List
                            autoHeight
                            width={width}
                            height={height}
                            isScrolling={isScrolling}
                            onScroll={onChildScroll}
                            scrollTop={scrollTop}
                            component={VirtualList}
                            classes={{ root: classes.listRoot }}
                            rowRenderer={rowRenderer}
                            rowHeight={69}
                            rowCount={totalRows}
                        />
                    )}
                </WindowScroller>
            )}
        </AutoSizer>
    );
}
