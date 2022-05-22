import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { PageWrapper } from './components/PageWrapper';
import { Home } from './pages/Home';
import { darkTheme, lightTheme } from "./styles/ApplicationTheme";
import { ReduxState } from "./definitions/ReduxState";
// import { lightTheme, darkTheme } from './styles/ApplicationTheme';
import { useSelector } from 'react-redux'
import { Stats } from './pages/Stats';
import { ThemeType } from './definitions/ThemeType';

function App() {
    
    const theme = useSelector((state: ReduxState) => state.theme);

    const getTheme = () => {
        if(theme === ThemeType.Light) return lightTheme;
        return darkTheme;
    }

    return (
        <ThemeProvider theme={getTheme()}>
            <CssBaseline/>
            <PageWrapper>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/stats' element={<Stats/>}/>
                </Routes>
            </PageWrapper>
        </ThemeProvider>
    );
}

export default App;
