import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Label } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import '../styles/NavMenu.css';
import * as LayoutStore from '../store/Layout';
import { LayoutState } from '../store/Layout';
import { connect } from 'react-redux';
import '../styles/Login.css';
import { ApplicationState } from '../store/index';
import { CookiesManager } from '../Managers/CookiesManager';



type LayoutProps =
    LayoutState &
    typeof LayoutStore.actionCreators &
    RouteComponentProps<{ UserName: string }>;


class MessagesLayout extends React.Component<LayoutProps, LayoutState> {

    constructor(props: LayoutProps) {
        super(props);
        //authenticate

        //...this.props.
    }

    state = {
        userName: this.props.userName,
        isOpen: false,
        isSignedIn: this.props.isSignedIn
    };

    componentDidMount() {
        let username = CookiesManager.GetUserName();
        this.setState({ userName: username })
        console.log("component Mounted, fetching data for user" + username)
    }

    LogOut(event: React.FormEvent<HTMLInputElement>) {



        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            })
        };
        fetch('/User/Api/SignOut', requestOptions)
            .then(response => response.json() as Promise<boolean>)
            .then(data => {
                console.log("Response recived")
                this.setState({ userName: "" });
                CookiesManager.FillUserName("");
                this.props.history.push('/');
            });

    }
    navLinkSwitch() {
        if (this.state.userName !== undefined && this.state.userName !== "" && this.state.userName.length > 0) {
            return true;
        }
        else {
            return false
        }
    }

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Communicator</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            {this.navLinkSwitch() &&
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink className="text-dark" id="UserName">Hello {this.state.userName}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" onClick={this.LogOut.bind(this)}>Log out</NavLink>
                                    </NavItem>
                                </ul>
                            }

                            {!this.navLinkSwitch() &&
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Log in</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                                    </NavItem>
                                </ul>
                            }
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}


export default connect(
    (state: ApplicationState) => state.layout,
    LayoutStore.actionCreators
)(MessagesLayout as any);