import { AppBar, Button, ButtonGroup, Container, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import {
  DeleteForeverRounded as DeleteIcon,
  CloseRounded as CloseIcon,
  SaveRounded as SaveIcon,
  EditRounded as EditIcon,
  CancelRounded as CancelIcon,
  CheckBoxRounded as YesIcon,
} from '@mui/icons-material';
import { useResponsive } from '../hooks/useResponsive';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store';
import { removePane } from '../store/Pane/action';

export enum PaneCommand {
  Close = 'close',
  Save = 'save',
  Delete = 'delete',
  Edit = 'edit',
  Cancel = 'cancel',
  Yes = 'yes',
}

interface PaneProps {
  children?: React.ReactNode;
  onCommand: (command: PaneCommand, paneIndex: number) => void;
  commands: PaneCommand[];
  index: number;
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
  [PaneCommand.Close]: <CancelIcon />,
  [PaneCommand.Cancel]: <CancelIcon />,
  [PaneCommand.Yes]: <YesIcon />,
};

export function Pane({ children, onCommand, commands = [], index }: PaneProps) {
  const pane = useSelector((state: AppState) => state.pane[index]);
  const dispath = useDispatch();

  const { theme, containerGutter } = useResponsive();
  const handleClose = () => onCommand(PaneCommand.Close, index);

  return (
    <Dialog
      fullScreen
      open={!pane.closing}
      onClose={handleClose}
      TransitionComponent={Transition}
      TransitionProps={{ unmountOnExit: true, onExited: () => dispath(removePane(index)) }}>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Close pane"
            onClick={handleClose}
            sx={{ marginRight: 'auto' }}>
            <CloseIcon />
          </IconButton>
          <ButtonGroup variant="text" color="primary" aria-label="Actions">
            {commands.map((c) => (
              <Button key={c} startIcon={icons[c]} onClick={() => onCommand(c, index)} title={c}>
                {c}
              </Button>
            ))}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" disableGutters={!containerGutter} sx={{ paddingTop: theme.spacing(2) }}>
        {children}
      </Container>
    </Dialog>
  );
}
