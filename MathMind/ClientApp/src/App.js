import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { PageWrapper } from './components/PageWrapper';
import { Home } from './pages/Home';
import { lightTheme, darkTheme } from './styles/ApplicationTheme';
import { useSelector } from 'react-redux'
import { Stats } from './pages/Stats';

function App() {

    const theme = useSelector(state => state.theme);

    const getTheme = () => {
        switch (theme) {
            default:
                return lightTheme;
            case "light":
                return lightTheme;
            case "dark":
                return darkTheme;
        }
    }
    
    return (
        <MuiThemeProvider theme={getTheme()}>
            <CssBaseline/>
            <PageWrapper>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/stats' component={Stats}/>
                </Switch>
            </PageWrapper>
        </MuiThemeProvider>
    );
}

export default App;
