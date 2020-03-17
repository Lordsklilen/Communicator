import * as React from 'react';
import { Container } from 'reactstrap';
import MessagesLayout from './MessagesLayout';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <MessagesLayout/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
