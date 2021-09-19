import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';
import { store } from './store';
import { gqlClient } from './store/utils';

ReactDOM.render(
  <ApolloProvider client={gqlClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.querySelector('#root')
);
