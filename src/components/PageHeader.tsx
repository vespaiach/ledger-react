import { Typography } from '@mui/material';

interface PageHeaderProps {
  text: string;
  subText?: React.ReactElement | string;
}

export function PageHeader({ text, subText }: PageHeaderProps) {
  return (
    <>
      <Typography variant="h4" gutterBottom={false} sx={{ mt: 1, mb: subText ? 0 : 3 }}>
        {text}
      </Typography>
      {subText && (
        <Typography variant="overline" display="block" color="text.disabled" sx={{ ml: 1, mb: 3 }}>
          {subText}
        </Typography>
      )}
    </>
  );
}
