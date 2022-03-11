import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
  <MemoryRouter>
    <Provider>
      <App />
    </Provider>
  </MemoryRouter>,
  document.querySelector('#root')
);
