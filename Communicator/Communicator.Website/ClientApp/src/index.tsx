import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './Configuration/configureStore';
import { Route } from 'react-router';
import Layout from './components/Layout';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import MessagesLayout from './components/MessagesLayout';

import registerServiceWorker from './Configuration/registerServiceWorker';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route exact path='/messages' component={MessagesLayout} />
            <Layout>
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/register' component={RegisterComponent} />
            </Layout>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
