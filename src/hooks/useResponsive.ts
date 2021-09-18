import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useMemo } from 'react';

interface ResponsiveReturn {
  iconEdge: 'start' | 'end';
  containerGutter: boolean;
}

export function useResponsive(): ResponsiveReturn {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return useMemo(() => {
    const iconEdge = matches ? 'end' : 'start';
    const containerGutter = matches;

    return {
      iconEdge,
      containerGutter,
    };
  }, [matches]);
}
