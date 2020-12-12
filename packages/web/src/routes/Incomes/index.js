import { ButtonGroup, Button, IconButton } from '@material-ui/core';
import { PhotoCamera, ControlPoint } from '@material-ui/icons';

import ImageFilter from '../../components/Icons/ImageFilter';
import BlockHeader from '../../components/BlockHeader';
import VirtualTable from '../../components/VirtualTable';

export default function IncomeList() {
    return (
        <>
            <BlockHeader title="Incomes Transactions">
                <ButtonGroup
                    disableElevation
                    variant="contained"
                    color="primary"
                >
                    <IconButton
                        color="primary"
                        aria-label="Add new transation"
                        component="span"
                    >
                        <ControlPoint fontSize="inherit" />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="Filter list"
                        component="span"
                    >
                        <ImageFilter fontSize="inherit" />
                    </IconButton>
                </ButtonGroup>
            </BlockHeader>
            <VirtualTable />
        </>
    );
}
