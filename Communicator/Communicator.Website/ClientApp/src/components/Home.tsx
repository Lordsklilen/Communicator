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

class Home extends React.Component<LoginProps> {

    public render() {
        return (
            <React.Fragment>
                <title title= "Lol title"/>
                <div className="Login">
                    <form> 
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            autoFocus
                            type="email"
                            //value={this.state.email}
                                //onChange={e => this.props.updateEmail()}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                                //value={this.state.password}
                        //onChange={e => this.props.updateEmail()}
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