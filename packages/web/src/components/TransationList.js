import { List, ListItem, Typography, IconButton, Divider } from '@material-ui/core';
import clsx from 'clsx';
import {
    EditRounded as EditRoundedIcon,
    DeleteRounded as DeleteRoundedIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AutoSizer, List as VirtualList, WindowScroller, InfiniteLoader } from 'react-virtualized';
import NumberFormat from 'react-number-format';
import { format } from 'date-fns';
import { Skeleton } from '@material-ui/lab';

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

export default function TransactionList({
    onLoadMore,
    onEdit,
    onDelete,
    loaderRef,
    data,
    totalRows,
}) {
    const classes = useStyles();
    const isRowLoaded = (index) => !!data[index];
    const rowRenderer = ({ index, style, key }) => {
        return (
            <div key={key} style={style}>
                {data[index] ? (
                    <ListItem alignItems="flex-start" disableGutters button>
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
                                {format(data[index].date, 'LLL do, yyyy')} |{' '}
                                {format(data[index].date, 'HH:mm')}
                            </Typography>
                        </div>
                        <div className={classes.boxDesc}>
                            <Typography variant="h6">{data[index].category}</Typography>
                            <Typography
                                variant="body2"
                                noWrap
                                classes={{ root: classes.typoEllipsis }}>
                                {data[index].description}
                            </Typography>
                        </div>
                        <div className={classes.boxGrow} />
                        <div className={classes.boxBtns}>
                            <IconButton
                                aria-label="edit income transaction"
                                onClick={() => onEdit(index)}>
                                <EditRoundedIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete income transaction"
                                onClick={() => onDelete(index)}>
                                <DeleteRoundedIcon />
                            </IconButton>
                        </div>
                    </ListItem>
                ) : (
                    <ListItem alignItems="flex-start" disableGutters>
                        <Skeleton variant="text" height={38} width={20} />
                        <div className={classes.boxMid}>
                            <Skeleton variant="text" height={38} />
                            <Skeleton variant="text" />
                        </div>
                        <div className={clsx(classes.boxGrow, classes.boxDesc)}>
                            <Skeleton variant="text" height={38} width="30%" />
                            <Skeleton variant="text" width="100%" />
                        </div>
                        <div className={clsx(classes.boxBtns, classes.boxBtnsSkeleton)}>
                            <Skeleton variant="circle" height={24} width={24} />
                            <Skeleton variant="circle" height={24} width={24} />
                        </div>
                    </ListItem>
                )}
                <Divider />
            </div>
        );
    };

    return (
        <AutoSizer disableHeight>
            {({ width }) => (
                <InfiniteLoader
                    ref={loaderRef}
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={onLoadMore}
                    rowCount={totalRows}>
                    {({ onRowsRendered, registerChild }) => (
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
                                    onRowsRendered={onRowsRendered}
                                    ref={registerChild}
                                />
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
}
