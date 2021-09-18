import { Pane, PaneCommand } from '../../components/Pane';
import { CommonPaneProps, TransactionModel } from '../../types';

interface EditProps extends CommonPaneProps {
  transaction?: TransactionModel;
}

export function Edit({ onClose, history }: EditProps) {
  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        history.goBack();
        break;
    }
  };

  return (
    <Pane onCommand={handlePaneCommand} commands={[PaneCommand.Delete, PaneCommand.Save]}>
      {[...new Array(112)]
        .map((_, i) => `${i}. iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii..`)
        .join('\n')}
    </Pane>
  );
}
