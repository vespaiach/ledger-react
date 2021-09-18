import { AppBar, Container, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  MoreVertRounded as MoreVertIcon,
  SearchRounded as SearchIcon,
  AddRounded as AddIcon,
  BarChartRounded as BarChartIcon,
} from '@mui/icons-material';

import { HideOnScroll } from './HideOnScroll';
import { AppCommand, CommandFunc } from '../types';

interface MasterProps {
  children: React.ReactNode;
  onCommand?: CommandFunc;
}

export function Skeleton({ children, onCommand }: MasterProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const iconEdge = matches ? 'end' : 'start';

  const handleClick = (command: AppCommand) => (args?: unknown) => {
    onCommand && onCommand(command, args);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar sx={{ backgroundColor: 'background.paper' }}>
          <Container maxWidth="md" disableGutters>
            <Toolbar disableGutters>
              <IconButton
                size="large"
                edge={iconEdge}
                color="primary"
                aria-label="Add transaction"
                onClick={handleClick(AppCommand.AddTransaction)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                edge={iconEdge}
                size="large"
                color="primary"
                aria-label="Search transaction"
                onClick={handleClick(AppCommand.SearchTransaction)}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                edge={iconEdge}
                size="large"
                color="primary"
                aria-label="Open chart"
                onClick={handleClick(AppCommand.OpenChart)}
              >
                <BarChartIcon />
              </IconButton>
              <IconButton
                size="large"
                color="primary"
                edge={iconEdge}
                aria-label="Open side navigation"
                onClick={handleClick(AppCommand.OpenSideNavigation)}
              >
                <MoreVertIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {children}
    </>
  );
}
