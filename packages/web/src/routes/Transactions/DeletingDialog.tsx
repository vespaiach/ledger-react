/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import { Grid, Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteForeverRounded as DeleteForeverRoundedIcon } from '@material-ui/icons';
import DialogPanel from '../../components/DialogPanel';

const useStyles = makeStyles((theme) => ({
  deletingConfirm: {
    display: 'flex',
    marginTop: theme.spacing(3),
  },
  deletingIcon: {
    width: 48,
    height: 48,
    marginRight: theme.spacing(2),
    color: theme.palette.warning.dark,
  },
  btns: {
    display: 'flex',
    marginTop: theme.spacing(3),
    '& button + button': {
      marginLeft: theme.spacing(3),
    },
  },
  btnDoit: {
    background: theme.palette.warning.dark,
  },
}));

interface DeletingDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

/**
 * Show confirmation dialog before deleting a record
 */
export default function DeletingDialog({ open, onClose, onDelete }: DeletingDialogProps) {
  const classes = useStyles();
  return (
    <DialogPanel title="Confirmation" open={open} onClose={onClose}>
      <Container maxWidth="xs">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.deletingConfirm}>
              <DeleteForeverRoundedIcon classes={{ root: classes.deletingIcon }} />
              <Typography>
                Deleted transaction record won't be recovered. Do you want to continue?
              </Typography>
            </div>
            <div className={classes.btns}>
              <Button variant="contained" disableElevation fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={onDelete}
                variant="contained"
                classes={{ root: classes.btnDoit }}
                disableElevation
                fullWidth>
                Do It
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </DialogPanel>
  );
}
