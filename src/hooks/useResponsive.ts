import { Theme, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useMemo } from 'react';

interface ResponsiveReturn {
  iconEdge: 'start' | 'end';
  containerGutter: boolean;
  theme: Theme;
}

export function useResponsive(): ResponsiveReturn {
  const theme = useTheme<Theme>();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return useMemo(() => {
    const iconEdge = matches ? 'end' : 'start';
    const containerGutter = matches;

    return {
      iconEdge,
      containerGutter,
      theme,
    };
  }, [matches, theme]);
}
