import { useContext } from 'react';

import { Pane, PaneCommand } from '../../components/Pane';
import { PaneHistory } from '../../contexts/paneHistory';

export function Edit() {
  const history = useContext(PaneHistory);

  const handlePaneCommand = (command: PaneCommand) => {
    switch (command) {
      case PaneCommand.Close:
        history.back();
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
