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
        errorMessage: this.props.errorMessage,
        redirect: this.props.redirect
    };

    renderRedirect() {
        if (this.props.redirect) {
            this.setState({
                redirect:false
            })
            this.props.history.push('/messages');
        }
    }

    authenticate(event: React.FormEvent<HTMLInputElement>) {
        console.log("authenticate request");
        var userNameLogin = (document.getElementById("userNameLogin") as HTMLInputElement).value;
        var loginPassword = (document.getElementById("loginPassword") as HTMLInputElement).value;
        this.props.RequestAuthenticate(userNameLogin, loginPassword);
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
                                <Label>User name</Label>
                                <Input
                                    autoFocus
                                    type="text"
                                    id="userNameLogin"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    id="loginPassword"
                                    type="password" />
                            </FormGroup>
                            <Label className="errorField">{this.state.errorMessage}</Label>
                            <Label className="errorField">{this.props.errorMessage}</Label>
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