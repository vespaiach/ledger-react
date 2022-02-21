import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export function Spinner({ className }: { className?: string }) {
  return (
    <Box className={className} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={40}
        thickness={4}
        value={100}
      />
    </Box>
  );
}
