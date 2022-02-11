import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';

import { App } from './App';
import { gqlClient } from './store/utils';

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <App />
  </ApolloProvider>,
  document.querySelector('#root')
);
