import { makeStyles } from '@material-ui/core/styles';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PrivatePageShell from '../../components/PrivatePageShell';
import TransactionList from '../../components/TransationList';

const useStyles = makeStyles((theme) => ({}));

export default function IncomeList() {
    const classes = useStyles();
    const imcomeList = useSelector((state) => state.ins.list);
    const fetching = useSelector((state) => state.ins.loading);
    const totalRecords = useSelector((state) => state.ins.totalRecords);
    const fetchedTotalRecords = useSelector((state) => state.ins.fetchedTotalRecords);

    const dispatch = useDispatch();

    const loaderRef = useRef(null);
    const resolver = useRef(null);

    /**
     * After fetched income rows, call resolver to trigger table's render
     */
    useEffect(() => {
        if (fetching) {
            resolver.current();
        }
    }, [fetching]);

    useEffect(() => {
        if (!fetchedTotalRecords && loaderRef.current !== null) {
            loaderRef.current.resetLoadMoreRowsCache(true);
        }
    }, [fetchedTotalRecords]);

    const handleLoadMore = ({ startIndex, stopIndex }) => {
        dispatch({
            type: 'Saga: request more income records',
            payload: { startIndex, stopIndex },
        });
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    };

    return (
        <TransactionList
            loaderRef={loaderRef}
            data={imcomeList}
            totalRows={totalRecords}
            onLoadMore={handleLoadMore}
        />
    );
}
