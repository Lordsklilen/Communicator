import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import * as LoginStore from '../store/Login';
import { LoginState } from '../store/Login';
import { RouteComponentProps, Redirect } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';

//Styles
import '../styles/Login.css';


type LoginProps =
    LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{ email: string }>;

class LoginComponent extends React.Component<LoginProps, LoginState> {

    state: Readonly<LoginState> = {
        email: this.props.email,
        password: this.props.password,
        redirect: this.props.redirect
    };

    handleOnChangeEmail(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
        this.setState({
            email: event.currentTarget.value
        } as LoginState);
    }

    handleOnChangePassword(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
        this.setState({
            password: event.currentTarget.value
        } as LoginState);
    }

    renderRedirect() {
        if (this.props.redirect) {
            return <Redirect to='/messages' />
        }
    }

    authenticate(event: React.FormEvent<HTMLInputElement>) {
        console.log("authenticate request");
        this.props.RequestAuthenticate(this.state.email, this.state.password);
    }

    public render() {
        return (
            <React.Fragment>
                <div className="LoginForm">
                    <title title="Communicator" />
                    <h1>Welcome to communicator</h1>
                    <div className="Login">
                        <form>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input
                                    autoFocus
                                    type="email"
                                    onChange={this.handleOnChangeEmail.bind(this)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    onChange={this.handleOnChangePassword.bind(this)}
                                    type="password" />
                            </FormGroup>
                            <Button onClick={this.authenticate.bind(this)} block>
                                Login
                        </Button>
                        </form>
                    </div>
                </div>

                {this.renderRedirect()}
            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(LoginComponent as any);