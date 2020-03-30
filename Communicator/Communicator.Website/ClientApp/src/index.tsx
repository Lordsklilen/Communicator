import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './Configuration/configureStore';
import { Route } from 'react-router';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import MessagesComponent from './components/MessagesComponent';

import registerServiceWorker from './Configuration/registerServiceWorker';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history={history}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/register' component={RegisterComponent} />
                <Route exact path='/messages' component={MessagesComponent} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
