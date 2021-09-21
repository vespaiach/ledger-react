import { useDispatch } from 'react-redux';

import { PageHeader } from '../components/PageHeader';
import { Pane, PaneCommand } from '../components/Pane';
import { useTransaction } from '../hooks/useTransaction';
import { popPane } from '../store/Pane/action';
import { PaneCommonProps } from '../types';

enum Mode {
  Create,
  Edit,
}

interface TransactionFormProps extends PaneCommonProps {}

export function TransactionForm({ state }: TransactionFormProps) {
  const dispatch = useDispatch();
  const transaction = useTransaction(state?.id);
  const mode = transaction ? Mode.Edit : Mode.Create;

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        dispatch(popPane());
        break;
    }
  };

  return (
    <Pane onCommand={handlePaneCommand} commands={[PaneCommand.Delete, PaneCommand.Save]}>
      <PageHeader text={mode === Mode.Create ? 'Add Transaction' : 'Update Transaction'} />
    </Pane>
  );
}
