import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Generated/Layout';
import LoginComponent from './components/LoginComponent';

export default () => (
    <Layout>
        <Route exact path='/' component={LoginComponent} />
    </Layout>
);
