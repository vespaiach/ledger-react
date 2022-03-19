import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { App } from './App';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);
