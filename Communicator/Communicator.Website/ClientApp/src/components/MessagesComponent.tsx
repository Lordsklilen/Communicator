import * as React from 'react';
import { NavItem, NavLink, Navbar, Container, NavbarBrand, NavbarToggler, Collapse } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as MessagesStore from '../store/Messages';
import { MessagesState } from '../store/Messages';
import { CookiesManager } from '../Managers/CookiesManager';
import { Status } from '../store/Models/Status';
import { ApplicationUser } from '../store/Models/ApplicationUser';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/ChatMessages.css';


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

                <div className="container">
                    <div className="messaging">
                        <div className="inbox_msg">
                            {/*Left Panel */}
                            <div className="inbox_people">
                                <div className="headind_srch">
                                    <div className="recent_heading">
                                        <h4>Recent</h4>
                                    </div>
                                    <div className="srch_bar">
                                        <div className="stylish-input-group">
                                            <input type="text" className="search-bar" placeholder="Search" />
                                            <span className="input-group-addon">
                                                <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                            </span> </div>
                                    </div>
                                </div>
                                <div className="inbox_chat">
                                    <div className="chat_list active_chat">
                                        <div className="chat_people">
                                            <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                            <div className="chat_ib">
                                                <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                                <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat_list">
                                        <div className="chat_people">
                                            <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                            <div className="chat_ib">
                                                <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                                                <p>Test, which is a new approach to have all solutions astrology under one roof.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="mesgs">
                                <div className="msg_history">
                                    <div className="incoming_msg">
                                        <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                        <div className="received_msg">
                                            <div className="received_withd_msg">
                                                <p>Test which is a new approach to have all solutions</p>
                                                <span className="time_date"> 11:01 AM    |    June 9</span></div>
                                        </div>
                                    </div>
                                    <div className="outgoing_msg">
                                        <div className="sent_msg">
                                            <p>Test which is a new approach to have allsolutions</p>
                                            <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                                    </div>
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <input type="text" className="write_msg" placeholder="Type a message" />
                                        <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div>
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
