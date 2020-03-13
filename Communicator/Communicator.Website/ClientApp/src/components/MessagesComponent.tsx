import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as MessagesStore from '../store/Messages';
import { MessagesState } from '../store/Messages';

//Styles
import '../styles/Login.css';


type MessagesProps =
    MessagesState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{ email: string }>;

class MessagesComponent extends React.Component<MessagesProps, MessagesState> {

    state: Readonly<MessagesState> = {
        email: this.props.email,
        password: this.props.password
    };

    public render() {
        return (
            <React.Fragment>
                <div className="Messages">
                    Here are message protected tab
                </div>

            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(MessagesComponent as any);