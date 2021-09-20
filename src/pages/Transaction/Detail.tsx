import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import NumberFormat from 'react-number-format';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';

import { Pane, PaneCommand } from '../../components/Pane';
import { useResponsive } from '../../hooks/useResponsive';
import { AppState } from '../../store';
import { formatShortDateTime } from '../../utils/date';

export function TransactionDetail() {
  const { theme } = useResponsive();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();
  const transaction = useSelector((state: AppState) => {
    const num = parseInt(id);
    return !isNaN(num)
      ? typeof state.transaction.lookup[num] === 'number'
        ? state.transaction.data[state.transaction.lookup[num]]
        : null
      : null;
  });

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        history.go(-1);
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
          Amount
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
          Date
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {formatShortDateTime(transaction.date)}
        </Typography>
        <Typography variant="body1" gridColumn="1" color="GrayText">
          Reason
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {transaction.reason.text}
        </Typography>
        <Typography variant="body1" gridColumn="1" color="GrayText">
          Description
        </Typography>
        <Typography variant="body1" component="p" gridColumn="2">
          {transaction.description}
        </Typography>
      </Box>
    </Pane>
  );
}
