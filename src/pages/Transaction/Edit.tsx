import { useHistory } from 'react-router';

import { Pane, PaneCommand } from '../../components/Pane';

export function Edit() {
  const history = useHistory();

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        history.go(-1);
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
