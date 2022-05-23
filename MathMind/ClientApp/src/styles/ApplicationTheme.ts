import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        primary: {  
            main: '#007013',
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

export const darkTheme = createTheme({
    palette: {
		mode: 'dark',
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