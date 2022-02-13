import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Suspense, useState } from 'react';
import { Provider } from 'jotai';
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { SpeedDial } from '@mui/material';

import TransactionList from './views/TransactionList';
import FilterInput from './views/FilterInput';

enum Path {
  AddNew = '/add',
  Filter = '/filter',
  Update = '/update',
}

const actions = [
  { icon: <FilterAltIcon />, name: 'Filter Transactions', path: Path.Filter },
  { icon: <AddIcon />, name: 'Add Transaction', path: Path.AddNew },
];

export function App() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleItemClick = (action: typeof actions[0]) => () => {
    setOpen(false);
    navigate(action.path);
  };

  return (
    <Provider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <SpeedDial
          ariaLabel="Shortcut Menu"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onOpen={() => void setOpen(true)}
          onClose={() => void setOpen(false)}
          open={open}
          icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleItemClick(action)}
            />
          ))}
        </SpeedDial>

        <Suspense fallback="Loading...">
          <Routes>
            <Route path="/filter" element={<FilterInput />} />
            <Route path="/add" element={<TransactionList />} />
            <Route path="/" element={<TransactionList />} />
          </Routes>
        </Suspense>
      </LocalizationProvider>
    </Provider>
  );
}
