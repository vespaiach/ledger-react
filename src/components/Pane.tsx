import {
  AppBar,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';
import {
  DeleteForeverRounded as DeleteIcon,
  CloseRounded as CloseIcon,
  SaveRounded as SaveIcon,
  EditRounded as EditIcon,
} from '@mui/icons-material';

export enum PaneCommand {
  Close = 'close',
  Save = 'save',
  Delete = 'delete',
  Edit = 'edit',
}

interface PaneProps {
  children?: React.ReactNode;
  onCommand: (command: PaneCommand) => void;
  commands: (PaneCommand.Delete | PaneCommand.Save | PaneCommand.Edit)[];
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const icons = {
  [PaneCommand.Save]: <SaveIcon />,
  [PaneCommand.Delete]: <DeleteIcon />,
  [PaneCommand.Edit]: <EditIcon />,
};

export function Pane({ children, onCommand, commands = [] }: PaneProps) {
  const [open, setOpen] = useState(true);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
      TransitionProps={{ unmountOnExit: true, onExited: () => onCommand(PaneCommand.Close) }}
    >
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Close pane"
            onClick={() => setOpen(false)}
            sx={{ marginRight: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
          <ButtonGroup variant="text" color="primary" aria-label="Actions">
            {commands.map((c) => (
              <Button startIcon={icons[c]} onClick={() => onCommand(c)}>
                {c}
              </Button>
            ))}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" disableGutters>
        {children}
      </Container>
    </Dialog>
  );
}
