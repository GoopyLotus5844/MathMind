import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
    palette: {
        primary: {  
            main: '#009c1a',
        },
        secondary: {
            main: '#2b84ff',
        },
        error: {
            main: '#ed3233',
        }
    },
    typography: {
        fontFamily: 'Arvo'
    },
});

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#009c1a',
        },
        secondary: {
            main: '#2b84ff',
        },
        background: {
            default: "#333"
        }
    },
    typography: {
        fontFamily: 'Arvo'
    },
});