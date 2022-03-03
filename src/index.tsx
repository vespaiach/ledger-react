import { ApolloProvider } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import ReactDOM from 'react-dom';

import { App } from './App';
import { gqlClient } from './store/utils';

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <MemoryRouter>
      <Provider>
        <App />
      </Provider>
    </MemoryRouter>
  </ApolloProvider>,
  document.querySelector('#root')
);
