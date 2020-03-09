import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Generated/Layout';
import Home from './components/Generated/Home';
import Counter from './components/Generated/Counter';
import FetchData from './components/Generated/FetchData';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
    </Layout>
);
