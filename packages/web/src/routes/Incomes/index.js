import { useEffect, useRef, useState } from 'react';
import { ButtonGroup, IconButton } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Setting from '../../components/Icons/Setting';
import Plus from '../../components/Icons/Plus';
import BlockHeader from '../../components/BlockHeader';
import VirtualTable from '../../components/VirtualTable';
import SettingDialog from '../../components/SettingDialog';
import { formatLongDate, formatCurrency } from '../../utils/format';
import FormDialog from './Form';

const headerHeight = 60;
const rowHeight = 60;

export default function IncomeList() {
    const [columns] = useState([
        {
            label: 'Date',
            dataKey: 'date',
            align: 'left',
            rowHeight,
            headerHeight,
            width: 20, // percent
            format: formatLongDate,
        },
        {
            label: 'Amount',
            dataKey: 'amount',
            align: 'right',
            rowHeight,
            headerHeight,
            width: 18, // percent
            format: formatCurrency,
        },
        {
            label: 'Description',
            dataKey: 'description',
            align: 'left',
            rowHeight,
            headerHeight,
            width: 30, // percent
        },
        {
            label: 'Category',
            dataKey: 'category',
            align: 'left',
            rowHeight,
            headerHeight,
            width: 20, // percent
        },
        {
            label: '',
            dataKey: '2_buttons',
            align: 'right',
            rowHeight,
            headerHeight,
            width: 12, // percent
        },
    ]);
    const [openSettingDialog, setOpenSettingDialog] = useState(false);
    const [formDialogData, setFormDialogData] = useState({});
    const [openFormDialog, setOpenFormDialog] = useState(false);

    const imcomeList = useSelector((state) => state.incomes.list);
    const fetching = useSelector((state) => state.incomes.fetching);
    const totalRecords = useSelector((state) => state.incomes.totalRecords);
    const categories = useSelector((state) => state.incomes.categories);
    const searchByDateFrom = useSelector((state) => state.incomes.search.dateFrom);
    const searchByDateTo = useSelector((state) => state.incomes.search.dateTo);
    const searchByCategory = useSelector((state) => state.incomes.search.category);
    const orderField = useSelector((state) => state.incomes.order.field);
    const orderDirection = useSelector((state) => state.incomes.order.direction);

    const dispatch = useDispatch();
    const resolver = useRef(null);

    /**
     * After fetched income rows, call resolver to trigger table's render
     */
    useEffect(() => {
        if (fetching) {
            resolver.current();
        }
    }, [fetching]);

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
        <>
            <BlockHeader title="Incomes Transactions">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <IconButton
                        color="primary"
                        aria-label="Add new transation"
                        component="span"
                        title="Add a new transation"
                        onClick={() => {
                            setFormDialogData({});
                            setOpenFormDialog(true);
                        }}
                    >
                        <Plus fontSize="inherit" title="Add a new transation" />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="Filtering and sorting"
                        component="span"
                        title="Filtering and sorting"
                        onClick={() => {
                            setOpenSettingDialog(true);
                        }}
                    >
                        <Setting fontSize="inherit" title="Filtering and sorting" />
                    </IconButton>
                </ButtonGroup>
            </BlockHeader>
            <VirtualTable
                totalRows={totalRecords}
                onLoadMore={handleLoadMore}
                rows={imcomeList}
                columns={columns}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                onEdit={(vals) => {
                    setFormDialogData(vals.rowData);
                    setOpenFormDialog(true);
                }}
            />
            <SettingDialog
                categories={categories}
                category={searchByCategory}
                from={searchByDateFrom}
                to={searchByDateTo}
                orderField={orderField}
                orderDirection={orderDirection}
                open={openSettingDialog}
                onClose={() => setOpenSettingDialog(false)}
                onSubmit={(payload) => {
                    dispatch({ type: 'Saga: update filtering and sorting', payload });
                }}
            />
            <FormDialog
                open={openFormDialog}
                categories={categories}
                id={formDialogData.id}
                date={formDialogData.date}
                amount={formDialogData.amount}
                description={formDialogData.description}
                category={formDialogData.category}
                onCancel={() => {
                    setFormDialogData({});
                    setOpenFormDialog(false);
                }}
                onSubmit={(payload) => {
                    dispatch({ type: 'Saga: update filtering and sorting', payload });
                }}
            />
        </>
    );
}
