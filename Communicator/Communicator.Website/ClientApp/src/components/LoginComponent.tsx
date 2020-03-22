import * as React from 'react';
import { Label, FormGroup, Input,  NavbarToggler, NavbarBrand, Container, Navbar, NavItem, Collapse, NavLink } from 'reactstrap';
import * as LoginStore from '../store/Login';
import { LoginState } from '../store/Login';
import { RouteComponentProps, Redirect } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import { CookiesManager } from '../Managers/CookiesManager'
import '../styles/Login.css';
import { Status } from '../store/Models/Status';
import { ApplicationUser } from '../store/Models/ApplicationUser';
import { Link } from 'react-router-dom';


type LoginProps =
    LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{ email: string }>;

class LoginComponent extends React.Component<LoginProps, LoginState> {

    state: Readonly<LoginState> = {
        errorMessage: "",
        userName: "",
        isOpen: false
    };

    authenticate(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("authenticate request");
        var userNameLogin = (document.getElementById("userNameLogin") as HTMLInputElement).value;
        var loginPassword = (document.getElementById("loginPassword") as HTMLInputElement).value;
        this.RequestAuthenticate(userNameLogin, loginPassword);
    }

    public render() {
        return (
            <React.Fragment>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/">Communicator</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Log in</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>

                <div className="LoginForm">
                    <title title="Communicator" />
                    <h1>Welcome to communicator</h1>
                    <div className="Login">
                        <form onSubmit={this.authenticate.bind(this)}>
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
                            <Input type="submit" block value="Login"/>
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
                }
                else {
                    this.setState({
                        errorMessage: data.message
                    })
                }
            });
    }
    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(LoginComponent as any);


export interface ResponseAuthenticate {
    message: string,
    status: Status,
    User: ApplicationUser
}