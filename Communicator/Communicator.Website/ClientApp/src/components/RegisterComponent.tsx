import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
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
        email: this.props.email,
        password: this.props.password
    };

    createUser(event: React.FormEvent<HTMLInputElement>) {
        console.log("Create user");
        //this.props.RequestAuthenticate(this.state.email, this.state.password);
    }


    handleOnChangePassword(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
        this.setState({
            password: event.currentTarget.value
        } as RegisterState);
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
                                <Label>Email</Label>
                                <Input
                                    autoFocus
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Password</Label>
                                <Input
                                    type="password" />
                            </FormGroup>
                            <FormGroup>
                                <Label>Confirm password</Label>
                                <Input
                                    type="password" />
                            </FormGroup>
                            <Button onClick={this.createUser.bind(this)} block>
                                Register
                        </Button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.register,
    RegisterStore.actionCreators
)(RegisterComponent as any);