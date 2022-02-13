import { ApolloProvider } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactDOM from 'react-dom';

import { App } from './App';
import { gqlClient } from './store/utils';
import { theme } from './theme';

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <App />
    </MemoryRouter>
  </ApolloProvider>,
  document.querySelector('#root')
);
