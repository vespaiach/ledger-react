import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'jotai';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.querySelector('#root')
);
