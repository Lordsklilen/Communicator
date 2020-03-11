import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Generated/Layout';
import LoginComponent from './components/LoginComponent';
import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={LoginComponent} />
    </Layout>
);
