import * as React from 'react';
import { NavItem, NavLink, Navbar, Container, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as MessagesStore from '../store/Messages';
import { MessagesState } from '../store/Messages';
import '../styles/Login.css';
import { CookiesManager } from '../Managers/CookiesManager';
import { Status } from '../store/Models/Status';
import { ApplicationUser } from '../store/Models/ApplicationUser';
import { Link } from 'react-router-dom';


type MessagesProps =
    MessagesState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{ UserName: string }>;

class MessagesComponent extends React.Component<MessagesProps, MessagesState> {

    constructor(props: MessagesProps) {
        super(props);

    }
    state: Readonly<MessagesState> = {
        UserName: "",
        IsSignedIn: false,
        User: null,
        isOpen: false
    };

    componentDidMount() {
        let username = CookiesManager.GetUserName();
        this.setState({ UserName: username })
        console.log("component Mounted, fetching data for user" + username)
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
                                        <NavLink className="text-dark" to="/Settings">Hello {this.state.UserName}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" onClick={this.LogOut.bind(this)}>Log out</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </header>


                <div id="MessagesComponent">
                    <div id="LeftPanel">
                        LeftPanel
                    </div>
                    <div id="RightPanel">
                        <div id="TopRightInfo">
                            TopRightInfo
                        </div>

                        <div id="MessagesPanel">
                            MessagesPanel
                        </div>
                        <div id="SendMessagePanel">
                            SendMessagePanel
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                this.setState({ UserName: "" });
                CookiesManager.FillUserName("");
                this.props.history.push('/');
            });

    }


    GetUser(userName: string) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
            })
        };
        fetch('/User/Api/GetUser', requestOptions)
            .then(response => response.json() as Promise<ResponseGetUser>)
            .then(data => {
            });
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(MessagesComponent as any);

export interface ResponseFriendsListAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}
export interface ResponseGetUser {
    type: 'ResponseAuthenticate_action',
    message: string,
    status: Status
    User: ApplicationUser | null
}
