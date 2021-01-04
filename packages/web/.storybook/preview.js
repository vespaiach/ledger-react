import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { CurrencyFormatContext } from '../src/App/AppContext';
import { formatCurrency } from '../src/utils/format';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Encode Sans Expanded, sans-serif',
    },
    palette: {
        common: { black: '#000', white: '#fff' },
        background: { paper: '#fff', default: '#fff' },
        primary: {
            light: 'rgba(142, 172, 187, 1)',
            main: 'rgba(96, 125, 139, 1)',
            dark: 'rgba(52, 81, 94, 1)',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgba(188, 156, 141, 1)',
            main: 'rgba(139, 110, 96, 1)',
            dark: 'rgba(93, 67, 54, 1)',
            contrastText: '#fff',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
    },
});

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <CurrencyFormatContext.Provider value={formatCurrency}>
                <CssBaseline />
                <Story />
            </CurrencyFormatContext.Provider>
        </ThemeProvider>
    ),
];
