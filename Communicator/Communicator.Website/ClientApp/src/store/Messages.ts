import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
import { Channel } from './Models/Channel';
import { Message } from './Models/Message';
import { AppThunkAction } from '.';
// STATE
export interface MessagesState {
    UserName: string;
    IsSignedIn: boolean;
    User: ApplicationUser | null;
    FriendsList: ApplicationUser[];
    Messages: Message[];
    Channels: Channel[];
    SearchedFriends: ApplicationUser[];
    isOpen:boolean
}

// ACTIONS
export interface ResponseFriendsListAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}
export interface ResponseGetSearchUsers {
    type: 'ResponseGetSearchUsers',
    message: string,
    status: Status
    users: ApplicationUser[]
}
export interface ResponseCreateChannel{
    type: 'ResponseCreateChannel',
    message: string,
    status: Status
    channels: Channel[]
    channel: Channel
}

export interface ResponseGetUser {
    type: 'ResponseGetUser',
    message: string,
    status: Status
    User: ApplicationUser | null
}
export type KnownAction = ResponseGetSearchUsers | ResponseCreateChannel | ResponseGetUser;

// ACTION CREATORS
export const actionCreators = {
    SearchForFriends: (word: string, userId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: userId,
                word: word
            })
        };
        return fetch('/User/Api/GetUsers', requestOptions)
            .then(response => response.json() as Promise<ResponseGetSearchUsers>)
            .then(data => {
                dispatch({
                    type: 'ResponseGetSearchUsers',
                    message: data.message,
                    status: data.status as Status,
                    users: data.users as ApplicationUser[]
                });
            });
    },

    CreateChannel: (UserId:string, channelname :string, userIds: string[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
                channelname: channelname,
                userIds: userIds
            })
        };
        return fetch('/Channel/Api/CreateChannel', requestOptions)
            .then(response => response.json() as Promise<ResponseCreateChannel>)
            .then(data => {
                dispatch({
                    type: 'ResponseCreateChannel',
                    message: data.message,
                    status: data.status as Status,
                    channels: data.channels as Channel[],
                    channel: data.channel as Channel
                });
            });
    },

    GetUser: (UserId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
            })
        };
        return fetch('/User/Api/GetUser', requestOptions)
            .then(response => response.json() as Promise<ResponseGetUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseGetUser',
                    message: data.message,
                    status: data.status as Status,
                    User: data.User as ApplicationUser
                });
            });
    },

    LogOut: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            })
        };
        fetch('/User/Api/SignOut', requestOptions);
    },
};

// REDUCER
export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return {
            UserName: "",
            IsSignedIn: false,
            User:null,
            isOpen: false,
            FriendsList: new Array(),
            Messages: new Array(),
            Channels: new Array(),
            SearchedFriends: new Array(),
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseGetSearchUsers':
            console.log("[ResponseGetSearchUsers.ResponseGetSearchUsers] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                Messages: state.Messages,
                Channels: state.Channels,
                isOpen: state.isOpen,
                FriendsList: state.FriendsList,
                SearchedFriends: action.users
            }
        case 'ResponseCreateChannel':
            console.log("[ResponseGetSearchUsers.ResponseCreateChannel] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                isOpen: state.isOpen,
                FriendsList: state.FriendsList,
                Messages: state.Messages,
                Channels: action.channels,
                SearchedFriends: state.SearchedFriends
            }
        case 'ResponseGetUser':
            console.log("[ResponseGetSearchUsers.ResponseGetUser] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: action.User,
                isOpen: state.isOpen,
                FriendsList: state.FriendsList,
                Messages: state.Messages,
                Channels: state.Channels,
                SearchedFriends: state.SearchedFriends
            }
        default:
            return state;
    }
};
