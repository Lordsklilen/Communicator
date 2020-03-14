import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import { RouteComponentProps, Redirect } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as RegisterStore from '../store/Register';
import { RegisterState } from '../store/Register';

//Styles
import '../styles/Login.css';


type RegisterProps =
    RegisterState &
    typeof RegisterStore.actionCreators &
    RouteComponentProps<{ email: string }>;

class RegisterComponent extends React.Component<RegisterProps, RegisterState> {

    state: Readonly<RegisterState> = {
        errorMessage: this.props.errorMessage,
        redirect: this.props.redirect
    };

    createUser(event: React.FormEvent<HTMLInputElement>) {
        var errorMsg = this.validateFields();
        this.setState({
            errorMessage: errorMsg
        } as RegisterState);
        if (errorMsg === "") {
            var email = (document.getElementById("registerEmail") as HTMLInputElement).value;
            var password = (document.getElementById("registerPasswordInput") as HTMLInputElement).value;
            this.props.RequestCreateUser(email, password);
            console.log("user created");

        }

    }

    renderRedirect(){
        if (this.props.redirect) {
            return <Redirect to='/messages' />
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

        if (email.length == 0) {
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
                            <Button onClick={this.createUser.bind(this)} block>
                                Register
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
    (state: ApplicationState) => state.register,
    RegisterStore.actionCreators
)(RegisterComponent as any);