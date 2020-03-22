import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import * as LoginStore from '../store/Login';
import { LoginState } from '../store/Login';
import { RouteComponentProps, Redirect } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';

import { CookiesManager } from '../Managers/CookiesManager'
import '../styles/Login.css';
import { Status } from '../store/Models/Status';
import { ApplicationUser } from '../store/Models/ApplicationUser';


type LoginProps =
    LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{ email: string }>;

export interface ResponseAuthenticate {
    message: string,
    status: Status,
    User: ApplicationUser

}
class LoginComponent extends React.Component<LoginProps, LoginState> {

    state: Readonly<LoginState> = {
        errorMessage: "",
        userName: ""
    };

    authenticate(event: React.FormEvent<HTMLInputElement>) {
        console.log("authenticate request");
        var userNameLogin = (document.getElementById("userNameLogin") as HTMLInputElement).value;
        var loginPassword = (document.getElementById("loginPassword") as HTMLInputElement).value;
        this.RequestAuthenticate(userNameLogin, loginPassword);
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
            </React.Fragment>
        );
    }

    //Actions
    RequestAuthenticate(userName: string, password: string) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        };
        fetch('/User/Api/Authenticate', requestOptions)
            .then(response => response.json() as Promise<ResponseAuthenticate>)
            .then(data => {
                console.log("Response recived, with message: " + data.message + ", with status: " + data.status)
                if (data.status === Status.Success) {
                    CookiesManager.FillUserName(data.User.UserName);
                    this.props.history.push('/messages');
                    window.location.reload();
                }
                else {
                    this.setState({
                        errorMessage: data.message
                    })
                }
            });
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(LoginComponent as any);