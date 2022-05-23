import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { createRoot } from 'react-dom/client'
import App from './App';
import allReducers from './reducers';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const store = createStore(
    allReducers
);

const rootElem = document.getElementById('root');
if (rootElem) {
    const root = createRoot(rootElem);
    
    const render = () => {
        root.render(
            <BrowserRouter basename={baseUrl ? baseUrl : undefined}>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    }
    render();
}
