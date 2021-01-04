import { Box } from '@material-ui/core';
import MonthlyList from './index';

const stories = {
    title: 'Components/MonthlyList',
    component: MonthlyList,
};

const Template = (args) => (
    <Box display="flex">
        <Box flex="1" bgcolor="primary.light" padding={2} color="info.main">
            <MonthlyList {...args} title="Expenses" />
        </Box>
        <Box flex="1" marginLeft={3} bgcolor="primary.light" padding={2}>
            <MonthlyList {...args} title="Incomes" />
        </Box>
    </Box>
);

export const BalanceInMonth = Template.bind(null);
BalanceInMonth.args = {
    title: 'Expenses',
    items: [
        { caption: 'Items 1', amount: 90 },
        { caption: 'Items 2', amount: 90 },
    ],
};

export default stories;
