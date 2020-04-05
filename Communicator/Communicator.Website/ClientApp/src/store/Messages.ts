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
    Messages: Message[];
    Channels: Channel[];
    Channel: Channel | null;
    SearchedFriends: ApplicationUser[];
    isOpen: boolean
}

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
                    SearchedFriends: data.SearchedFriends as ApplicationUser[]
                });
            });
    },

    CreateChannel: (UserId: string, channelname: string, userIds: string[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
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
                    channels: data.channels as Channel[]
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

    GetChannelsForUser: (UserId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
            })
        };
        return fetch('/Channel/Api/GetChannelsForUser', requestOptions)
            .then(response => response.json() as Promise<ResponseGetChannelsForUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseGetChannelsForUser',
                    message: data.message,
                    status: data.status as Status,
                    channels: data.channels as Channel[]
                });
            });
    },

    SelectChannel: (UserId:string,ChannelId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
                ChannelId: ChannelId
            })
        };
        return fetch('/Channel/Api/SelectChannel', requestOptions)
            .then(response => response.json() as Promise<ResponseSelectChannel>)
            .then(data => {
                dispatch({
                    type: 'ResponseSelectChannel',
                    message: data.message,
                    status: data.status as Status,
                    Channel: data.Channel as Channel
                });
            });
    },
};

// REDUCER
export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return {
            UserName: "",
            IsSignedIn: false,
            User: null,
            isOpen: false,
            Messages: [],
            Channels: [],
            Channel: null,
            SearchedFriends: [],
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseGetSearchUsers':
            console.log("[ResponseGetSearchUsers] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                Messages: state.Messages,
                Channels: state.Channels,
                Channel: state.Channel,
                isOpen: state.isOpen,
                SearchedFriends: action.SearchedFriends
            }
        case 'ResponseCreateChannel':
            console.log("[ResponseCreateChannel] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                isOpen: state.isOpen,
                Messages: state.Messages,
                Channels: action.channels,
                Channel: state.Channel,
                SearchedFriends: state.SearchedFriends
            }
        case 'ResponseGetUser':
            console.log("[ResponseGetUser] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: action.User,
                isOpen: state.isOpen,
                Messages: state.Messages,
                Channels: state.Channels,
                Channel: state.Channel,
                SearchedFriends: []
            }
        case 'ResponseGetChannelsForUser':
            console.log("[ResponseGetChannelsForUser] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                isOpen: state.isOpen,
                Messages: state.Messages,
                Channels: action.channels,
                Channel: state.Channel,
                SearchedFriends: []
            }
        case 'ResponseSelectChannel':
            console.log("[ResponseSelectChannel] response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                UserName: state.UserName,
                IsSignedIn: state.IsSignedIn,
                User: state.User,
                isOpen: state.isOpen,
                Messages: state.Messages,
                Channels: state.Channels,
                Channel: action.Channel,
                SearchedFriends: []
            }
        default:
            return state;
    }
};



// ACTIONS
export type KnownAction = ResponseGetSearchUsers | ResponseCreateChannel | ResponseGetUser | ResponseGetChannelsForUser | ResponseSelectChannel;
export interface ResponseGetSearchUsers {
    type: 'ResponseGetSearchUsers',
    message: string,
    status: Status,
    SearchedFriends: ApplicationUser[],
}

export interface ResponseCreateChannel {
    type: 'ResponseCreateChannel',
    message: string,
    status: Status,
    channels: Channel[],
}

export interface ResponseGetUser {
    type: 'ResponseGetUser',
    message: string,
    status: Status,
    User: ApplicationUser | null,
}

export interface ResponseGetChannelsForUser {
    type: 'ResponseGetChannelsForUser',
    message: string,
    status: Status,
    channels: Channel[],
}
export interface ResponseSelectChannel {
    type: 'ResponseSelectChannel',
    message: string,
    status: Status,
    Channel: Channel,
}