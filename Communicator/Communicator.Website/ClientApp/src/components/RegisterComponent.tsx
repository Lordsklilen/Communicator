import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import { RouteComponentProps, Redirect } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as RegisterStore from '../store/Register';
import { RegisterState } from '../store/Register';
import '../styles/Login.css';
import { Status } from '../store/Models/Status';
import { CookiesManager } from '../Managers/CookiesManager';
import { ApplicationUser } from '../store/Models/ApplicationUser';


type RegisterProps =
    RegisterState &
    typeof RegisterStore.actionCreators &
    RouteComponentProps<{ email: string }>;

export interface ResponseCreateUser {
    message: string,
    status: Status
    User: ApplicationUser
}

class RegisterComponent extends React.Component<RegisterProps, RegisterState> {

    state: Readonly<RegisterState> = {
        errorMessage: "",
    };

    createUser(event: React.FormEvent<HTMLInputElement>) {
        var errorMsg = this.validateFields();
        this.setState({
            errorMessage: errorMsg
        } as RegisterState);
        if (errorMsg === "") {
            var email = (document.getElementById("registerEmail") as HTMLInputElement).value;
            var password = (document.getElementById("registerPasswordInput") as HTMLInputElement).value;
            var userName = (document.getElementById("registerUserName") as HTMLInputElement).value;
            this.RequestCreateUser(userName, email, password);
            console.log("user created");

        }

    }

    handleOnChangePassword(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            errorMessage: this.validateFields()
        } as RegisterState);

    }

    validateFields() {
        var email = (document.getElementById("registerEmail") as HTMLInputElement).value;
        var password = (document.getElementById("registerPasswordInput") as HTMLInputElement).value;
        var checkpassword = (document.getElementById("registerCheckPasswordInput") as HTMLInputElement).value;

        if (email.length === 0) {
            return "Email cannot be empty"
        }
        else if (password !== checkpassword) {
            return "Passwords do not match."
        }
        return "";
    }

    public render() {
        return (
            <React.Fragment>
                <div className="LoginForm">
                    <title title="Communicator" />
                    <h1>Register new user</h1>
                    <div className="Register">
                        <form>
                            <FormGroup>
                                <Label>User name</Label>
                                <Input
                                    autoFocus
                                    id="registerUserName"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>

                                <Label>Email</Label>
                                <Input
                                    autoFocus
                                    id="registerEmail"
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    id="registerPasswordInput"
                                    type="password"
                                    onChange={this.handleOnChangePassword.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm password</Label>
                                <Input
                                    id="registerCheckPasswordInput"
                                    type="password"
                                    onChange={this.handleOnChangePassword.bind(this)} />
                            </FormGroup>
                            <Label className="errorField">{this.state.errorMessage}</Label>
                            <Label className="errorField">{this.props.errorMessage}</Label>
                            <Button onClick={this.createUser.bind(this)} block>
                                Register
                        </Button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    //Actions
    RequestCreateUser(userName: string, email: string, password: string) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        };
        fetch('/User/Api/CreateUser', requestOptions)
            .then(response => response.json() as Promise<ResponseCreateUser>)
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
    (state: ApplicationState) => state.register,
    RegisterStore.actionCreators
)(RegisterComponent as any);