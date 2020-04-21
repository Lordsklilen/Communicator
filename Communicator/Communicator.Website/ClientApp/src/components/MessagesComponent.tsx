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
import { Message } from '../store/Models/Message';
import Emoji from 'react-emoji-render';

type MessagesProps =
    MessagesState &
    typeof MessagesStore.actionCreators &
    RouteComponentProps<{ UserName: string }>;

class MessagesComponent extends React.Component<MessagesProps, MessagesState> {

    interval = setInterval(x => this.UpdateMessages(), 1000);
    state: Readonly<MessagesState> = {
        UserName: "",
        SearchedFriends: this.props.SearchedFriends,
        User: null,
        ShouldUpdateMessages: false,
        Channels: this.props.Channels,
        Channel: null,
    };

    componentDidMount() {
        let username = CookiesManager.GetUserName();
        if (username === "") {
            this.props.history.push("/");
        }
        this.props.GetUser(username);
        this.props.GetChannelsForUser(username);
        this.setState({ UserName: username })
        console.log("component Mounted, fetching data for user" + username)
        this.AddEventListeners();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        this.setState({
            Channel: null,
            Channels: [],
            SearchedFriends: []
        })
    }

    componentDidUpdate(prevProps: MessagesProps, prevState: MessagesState) {
        if (this.props.ShouldUpdateMessages) {
            var element = document.getElementById("messagePanel") as HTMLDivElement;
            if (element !== null) {
                element.scrollTop = element.scrollHeight;
            }
        }
        if (Array.isArray(this.props.Channels) && this.props.Channels.length && prevProps.Channels.length === 0) {
            var nodes = document.querySelectorAll('.chat_list');
            var first = nodes[0];
            (first as HTMLDivElement).click();
        }
    }

    AddEventListeners() {
        var input = document.getElementById("messageContent") as HTMLTextAreaElement;
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13 && !event.shiftKey) {
                event.preventDefault();
                (document.getElementById("sendButton") as HTMLButtonElement).click();
            }
        });
    }

    UpdateMessages() {
        if (this.props.Channel !== null && this.props.Channel !== undefined) {
            let date = new Date(0);
            if (this.props.Channel.Messages.length > 0) {
                date = this.props.Channel.Messages[this.props.Channel.Messages.length - 1].SentTime;
            }
            this.props.UpdateMessages(this.state.UserName, this.props.Channel.ChannelId, date)
        }
    }

    public render() {
        return (
            <React.Fragment>
                <header>
                    <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                        <Container>
                            <NavbarBrand tag={Link} to="/Settings">Communicator</NavbarBrand>
                            <NavbarToggler className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/Settings">Hello {this.state.UserName}
                                            <img className="profilImage" src={"/User/GetImage/" + this.state.UserName} alt="Profile" />
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark LogOut" onClick={this.LogOut.bind(this)} to="/">Log out</NavLink>
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
                                        <Input type="button" onClick={this.ShowSearch.bind(this)} value="Add Friends" />
                                        <h4>Channels</h4>
                                    </div>
                                </div>
                                {/* Channel list */}
                                <div className="inbox_chat">
                                    {this.RenderChannels()}
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="mesgs">
                                <div className="msg_history" id="messagePanel">
                                    {this.RenderPreviousMessages()}
                                    {this.RenderMessages()}
                                </div>
                                <div className="type_msg">
                                    <div className="input_msg_write">
                                        <textarea id="messageContent" className="write_msg" rows={4} placeholder="Type a message" />
                                        <button id="sendButton" className="msg_send_btn" onClick={this.SendMessage.bind(this)} type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Form */}
                <div className="form-popupHide" id="SearchDiv">
                    <div className="FormBody">
                        <div className="PopupSearch">
                            <input id="SearchFriendsText" type="text" placeholder="Search.." name="search" />
                            <button className="fa fa-search fa-lg searchSubmit" onClick={this.SearchForFriends.bind(this)} />
                            <button className="fa fa-times fa-lg exitSearch" onClick={this.HideSearch.bind(this)} />
                        </div>
                        <div id="searchFriends" className="SearchedFriends">
                            {this.RenderFriends()}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    RenderPreviousMessages() {
        if (this.props.Channel == null || this.props.Channel.Messages == null)
            return "";
        else if (this.props.Channel.Messages.length > 19) {
            return (
                <div className="loadPrevious" onClick={this.LoadPreviousMessages.bind(this)}>
                    <span>Load previous messages</span>
                </div>
            );
        }
    }

    RenderFriends() {
        let friends = this.Friends();
        return this.props.SearchedFriends.map((friend: ApplicationUser, i: number) => {
            if (friends.includes(friend.UserName) || this.state.UserName === friend.UserName)
                return "";
            return (
                <div className="chat_list" key={i.toString()} data-friendusername={friend.UserName} onClick={this.ChooseNewFriend.bind(this)}>
                    <div className="chat_people">
                        <div className="chat_img"> <img className="profilImage" src={"/User/GetImage/" + friend.UserName} alt="sunil" /> </div>
                        <div className="chat_ib">
                            <h4>{friend.UserName}</h4>
                        </div>
                    </div>
                </div>
            )
        })
    }

    RenderMessages() {
        let channel = this.props.Channel;
        if (channel === null || channel === undefined) {
            return;
        }
        let messages = channel.Messages;
        if (messages === null || messages === undefined) {
            return;
        }
        return messages.map((message: Message, i: number) => {
            var date = new Date(message.SentTime);
            let day = date.getDate();
            let month = this.monthNames[date.getMonth()];
            let hour = date.getHours();
            let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

            if (message.UserId === this.state.UserName) {
                return (
                    <div className="outgoing_msg" key={message.MessageId}>
                        <div className="sent_msg">
                            <p><Emoji text={message.Content} /></p>
                            <span className="time_date float_right"> {hour}:{minutes}    |    {month} {day} </span></div>
                    </div>
                )
            }
            else {

                return (
                    <div className="incoming_msg" key={message.MessageId}>
                        <div className="incoming_msg_img"> <img src={"/User/GetImage/" + message.UserId} alt="Profile" /> </div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <p><Emoji text={message.Content} /></p>
                                <span className="time_date float_left"> {hour}:{minutes}    |    {month} {day}</span></div>
                        </div>
                    </div>
                )
            }
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
                    return id !== UserName;
                }).find(x => x) as string;
            }
            let lastMessage = this.getLastMessage(channel);
            var messagePeak = "";
            if (lastMessage.UserId !== undefined)
                messagePeak = lastMessage.UserId + ": " + lastMessage.Content.substring(0, 30);
            return (
                <div className="chat_list" data-channelid={channel.ChannelId.toString()} key={channel.ChannelId.toString()} onClick={this.SelectChannel.bind(this)}>
                    <div className="chat_people">
                        <div className="chat_img"> <img className="profilImage" src={"/User/GetImage/" + channelname} alt="User {channelname}" /> </div>
                        <div className="chat_ib">
                            <h5>{channelname} <span className="chat_date">Dec 25(DATE)</span></h5>
                            <p><Emoji text={messagePeak} /></p>
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
        return friends.map((friend) => {
            return friend.UserIds.filter((id: string) => {
                return id !== this.state.UserName;
            }).find(x => x) as string;
        });
    }

    getLastMessage(channel: Channel): Message {
        if (channel === null || channel === undefined)
            return new Message("");
        let messages = channel.Messages;
        if (messages === null || messages === undefined)
            return new Message("");
        let message = messages.find(x => x);
        if (message === null || message === undefined)
            return new Message("");
        return message
    }

    LoadPreviousMessages() {
        if (this.props.Channel !== null && this.props.Channel !== undefined) {
            if (this.props.Channel.Messages.length > 0) {
                var date = this.props.Channel.Messages[0].SentTime;
                this.props.LoadPrevious(this.state.UserName, this.props.Channel.ChannelId, date)
            }

        }
    }

    SelectChannel(event: React.FormEvent<HTMLDivElement>) {
        let channelId = Number(event.currentTarget.dataset.channelid);
        var elems = document.getElementsByClassName("active_chat");
        [].forEach.call(elems, function (el: HTMLDivElement) {
            el.classList.remove("active_chat");
        });
        event.currentTarget.classList.add("active_chat");
        this.props.SelectChannel(this.state.UserName, channelId);
    }

    SendMessage(event: React.FormEvent<HTMLButtonElement>) {
        if (this.props.Channel === null) {
            return;
        }
        var input = (document.getElementById("messageContent") as HTMLInputElement);
        if (input.value === "") {
            return;
        }
        this.props.SendMessage(this.state.UserName, this.props.Channel, input.value);
        input.value = "";
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

    LogOut(event: React.FormEvent<HTMLInputElement>) {
        this.props.LogOut();
        this.setState({ UserName: "" });
        CookiesManager.FillUserName("");
        this.props.history.push('/');
    }

    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

}

export default connect(
    (state: ApplicationState) => state.messages,
    MessagesStore.actionCreators
)(MessagesComponent as any);