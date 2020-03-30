import * as React from 'react';
import { NavItem, NavLink, Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Input } from 'reactstrap';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store/index';
import { connect } from 'react-redux';
import * as MessagesStore from '../store/Messages';
import { MessagesState } from '../store/Messages';
import { CookiesManager } from '../Managers/CookiesManager';
import { ApplicationUser } from '../store/Models/ApplicationUser';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import '../styles/ChatMessages.css';
import '../styles/Search.css';
import { Channel } from '../store/Models/Channel';


type MessagesProps =
    MessagesState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{ UserName: string }>;

class MessagesComponent extends React.Component<MessagesProps, MessagesState> {

    state: Readonly<MessagesState> = {
        UserName: "",
        Messages: this.props.Messages,
        SearchedFriends: this.props.SearchedFriends,
        IsSignedIn: false,
        User: null,
        isOpen: false,
        Channels: this.props.Channels,
    };
    componentDidMount() {
        let username = CookiesManager.GetUserName();
        if (username === "") {
            this.props.history.push("/");
        }
        this.setState({
            Messages: [],
            Channels: [],
            SearchedFriends: []
        })
        this.props.GetUser(username);
        this.props.GetChannelsForUser(username);
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
                                        <NavLink tag={Link} className="text-dark" onClick={this.LogOut.bind(this)} to="/">Log out</NavLink>
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
                                        <h4>Friends</h4>
                                        <div>
                                            <Input type="button" onClick={this.ShowSearch.bind(this)} value="Add Friends" />
                                        </div>
                                        <h4>Search</h4>
                                        <div className="stylish-input-group">
                                            <span className="input-group-addon">
                                                <Input type="text"> <i className="fa fa-search" aria-hidden="true"></i> </Input>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* Channel list */}
                                <div className="inbox_chat">
                                    {this.RenderChannels()}
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


                {/* Search Form */}
                <div className="form-popupHide" id="SearchDiv">
                    <div className="FormBody">
                        <div className="PopupSearch">
                            <input id="SearchFriendsText" type="text" placeholder="Search.." name="search" />
                            <button className="fa fa-search fa-lg searchSubmit" onClick={this.SearchForFriends.bind(this)} />
                            <button className="fa fa-times fa-lg exitSearch" onClick={this.HideSearch.bind(this)} />
                        </div>
                        <div className="SearchedFriends">
                            {this.RenderFriends()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    RenderFriends() {
        let friends = this.Friends();
        return this.props.SearchedFriends.map((friend: ApplicationUser, i: number) => {
            if (friends.includes(friend.UserName) || this.state.UserName === friend.UserName)
                return "";
            return (
                <div className="chat_list" key={i.toString()} data-friendusername={friend.UserName} onClick={this.ChooseNewFriend.bind(this)}>
                    <div className="chat_people">
                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                        <div className="chat_ib">
                            <h4>{friend.UserName}</h4>
                        </div>
                    </div>
                </div>
            )
        })
    }

    RenderChannels() {
        if (this.props.Channels == null || this.props.Channels.length <= 0)
            return "";
        let UserName = this.state.UserName;
        return this.props.Channels.map((channel: Channel, i) => {
            let channelname = channel.ChannelName;
            if (!channel.isGroupChannel) {
                channelname = channel.UserIds.filter(function (id: string) {
                    return id != UserName;
                }).pop() as string;
            }
            return (
                <div className="chat_list" data-channelid={channel.ChannelId.toString()} key={channel.ChannelId.toString()} onClick={this.SelectChannel.bind(this)}>
                    <div className="chat_people">
                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="User Image" /> </div>
                        <div className="chat_ib">
                            <h5>{channelname} <span className="chat_date">Dec 25(DATE)</span></h5>
                            <p>Mesage Text</p>
                        </div>
                    </div>
                </div>
            )
        });
    }


    Friends() {
        let friends = this.props.Channels.filter((channel: Channel, i) => {
            return !channel.isGroupChannel;

        });
        return friends.map((friend)  => {
            return friend.UserIds.filter((id: string) => {
                return id != this.state.UserName;
            }).pop() as string;
        });
    }
    SelectChannel(event: React.FormEvent<HTMLDivElement>) {
        console.log("Channel selected id: " + event.currentTarget.dataset.channelid);
        var elems = document.getElementsByClassName("active_chat");
        [].forEach.call(elems, function (el: HTMLDivElement) {
            el.classList.remove("active_chat");
        });
        event.currentTarget.classList.add("active_chat");
    }

    ShowSearch(event: React.FormEvent<HTMLInputElement>) {
        (document.getElementById('SearchDiv') as HTMLInputElement).className = ("form-popupShow")
    }

    HideSearch(event: React.FormEvent<HTMLSpanElement>) {
        (document.getElementById('SearchDiv') as HTMLInputElement).className = ("form-popupHide")
    }

    SearchForFriends(event: React.FormEvent<HTMLButtonElement>) {
        let searchPhrase = (document.getElementById('SearchFriendsText') as HTMLInputElement).value;
        this.props.SearchForFriends(searchPhrase, this.state.UserName);
    }

    ChooseNewFriend(event: React.FormEvent<HTMLElement>) {
        let friendName = event.currentTarget.dataset.friendusername as string;
        console.log("clicked friend " + friendName);
        this.props.CreateChannel(this.state.UserName, "channelname", [this.state.UserName, friendName]);
        (document.getElementById('SearchDiv') as HTMLInputElement).className = ("form-popupHide");
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    LogOut(event: React.FormEvent<HTMLInputElement>) {
        this.props.LogOut();
        this.setState({ UserName: "" });
        CookiesManager.FillUserName("");
        this.props.history.push('/');
    }
}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(MessagesComponent as any);