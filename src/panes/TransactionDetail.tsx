import { useState } from 'react';
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
import { deleteTransaction } from '../store/Transaction/action';

interface TransactionDetailProps extends PaneCommonProps {}

export function TransactionDetail({ state, index }: TransactionDetailProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispath = useDispatch();
  const transaction = useTransaction(state?.id);

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        dispath(popPane(index));
        break;
      case PaneCommand.Edit:
        dispath(pushPane({ name: 'TransactionForm', state: { id: (transaction as Transaction).id } }));
        break;
      case PaneCommand.Delete:
        setShowConfirmation(true);
        break;
      case PaneCommand.Cancel:
        setShowConfirmation(false);
        break;
      case PaneCommand.Yes:
        dispath(deleteTransaction(transaction?.id as number));
        break;
    }
  };

  if (!transaction) {
    return (
      <Pane onCommand={handlePaneCommand} commands={[]} index={index}>
        <PageHeader text="Transaction Detail" subText={'No data.'} />
      </Pane>
    );
  }

  return (
    <Pane
      index={index}
      onCommand={handlePaneCommand}
      commands={
        showConfirmation ? [PaneCommand.Yes, PaneCommand.Cancel] : [PaneCommand.Edit, PaneCommand.Delete]
      }>
      <PageHeader text="Transaction Detail" />
      {showConfirmation && (
        <Box>
          <Typography variant="h6" sx={{ pb: 2, color: (theme) => theme.palette.warning.dark }}>
            You are deleting the transaction below, and this action can't be undone!
          </Typography>
        </Box>
      )}
      <Box
        display="grid"
        gridTemplateColumns="110px auto"
        sx={
          showConfirmation
            ? {
                borderLeft: 1,
                borderColor: (theme) => theme.palette.warning.dark,
                pl: 3,
                ml: 1,
              }
            : undefined
        }>
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
