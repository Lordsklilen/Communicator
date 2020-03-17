import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import '../styles/NavMenu.css';
import * as LayoutStore from '../store/Layout';
import { LayoutState } from '../store/Layout';
import { connect } from 'react-redux';
import '../styles/Login.css';
import { ApplicationState } from '../store/index';



type LayoutProps =
    LayoutState &
    typeof LayoutStore.actionCreators &
    RouteComponentProps<{ UserName: string }>;


class MessagesLayout extends React.PureComponent<LayoutProps, LayoutState> {
    state = {
        userName: this.props.userName,
        isOpen: this.props.isOpen,
        isSignedIn: this.props.isSignedIn
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Communicator</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            {this.props.isSignedIn &&
                                <ul className="navbar-nav flex-grow">
                                    Hello {this.state.userName}
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/">Log out</NavLink>
                                    </NavItem>
                                </ul>
                            }

                            {!this.props.isSignedIn &&
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