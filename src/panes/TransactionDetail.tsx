import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import NumberFormat from 'react-number-format';

import { PageHeader } from '../components/PageHeader';
import { Pane, PaneCommand } from '../components/Pane';
import { formatShortDateTime } from '../utils/date';
import { useTransaction } from '../hooks/useTransaction';
import { PaneCommonProps } from '../types';
import { popPane, pushPane } from '../store/Pane/action';
import { Transaction } from '../graphql.generated';

interface TransactionDetailProps extends PaneCommonProps {}

export function TransactionDetail({ state }: TransactionDetailProps) {
  const dispath = useDispatch();
  const transaction = useTransaction(state?.id);

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        dispath(popPane());
        break;
      case PaneCommand.Edit:
        dispath(
          pushPane({ name: 'TransactionForm', state: { id: (transaction as Transaction).id } })
        );
        break;
    }
  };

  if (!transaction) {
    return (
      <Pane onCommand={handlePaneCommand} commands={[]}>
        <PageHeader text="Transaction Detail" subText={'No data.'} />
      </Pane>
    );
  }

  return (
    <Pane onCommand={handlePaneCommand} commands={[PaneCommand.Edit, PaneCommand.Delete]}>
      <PageHeader text="Transaction Detail" />
      <Box display="grid" gridTemplateColumns="110px auto">
        <Typography variant="body1" gridColumn="1" color="GrayText">
          amount
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          <NumberFormat
            value={transaction.amount}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
          />
        </Typography>
        <Typography variant="body1" gridColumn="1" color="GrayText">
          date
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {formatShortDateTime(transaction.date)}
        </Typography>
        <Typography variant="body1" gridColumn="1" color="GrayText">
          reason
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {transaction.reason.text}
        </Typography>
        <Typography variant="body1" gridColumn="1" color="GrayText">
          description
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {transaction.description}
        </Typography>
      </Box>
    </Pane>
  );
}
