import { Typography } from '@mui/material';

import { theme } from '../theme';

interface PageHeaderProps {
  text: string;
  subText?: React.ReactElement | string;
}

export function PageHeader({ text, subText }: PageHeaderProps) {
  return (
    <>
      <Typography
        variant="h4"
        gutterBottom={false}
        sx={{ marginBottom: subText ? 0 : theme.spacing(2) }}
      >
        {text}
      </Typography>
      {subText && (
        <Typography
          variant="overline"
          display="block"
          color="text.disabled"
          sx={{ marginLeft: theme.spacing(1), marginBottom: theme.spacing(2) }}
        >
          {subText}
        </Typography>
      )}
    </>
  );
}
