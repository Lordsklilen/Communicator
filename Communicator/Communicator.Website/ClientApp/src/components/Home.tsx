import * as React from 'react';
import { Label, FormGroup, Input, Button } from 'reactstrap';
import * as LoginStore from '../store/Login';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';

type LoginProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators & 
    RouteComponentProps<{}>;

class Home extends React.Component<LoginProps, LoginStore.LoginState> {
 
    state: Readonly<LoginStore.LoginState> = {
        email: this.props.email,
        password: this.props.password
    };    

    handleOnChangeEmail(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
    }

    handleOnChangePassword(event: React.FormEvent<HTMLInputElement>) {
        console.log(event.currentTarget.value);
    }

    public render() {
        return (
            <React.Fragment>
                <title title="Lol title" />
                <h1>h1: {this.state.email} /h1</h1>
                <div className="Login">
                    <form> 
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            autoFocus
                            type="email"
                            onChange={this.handleOnChangeEmail} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            onChange={this.handleOnChangePassword}
                            type="password"/>
                        </FormGroup>
                        <Button block type="submit">
                            Login
                        </Button>
                    </form>
                </div>

            </React.Fragment>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Home);