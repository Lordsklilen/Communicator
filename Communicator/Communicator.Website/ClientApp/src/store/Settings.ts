import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
import { AppThunkAction } from '.';
import { LogOutClean, ResponseGetUser, ResponseGetChannelsForUser } from './Messages';
import '../styles/Login.css';
import '../styles/ChatMessages.css';
import '../styles/Search.css';
import { Channel } from './Models/Channel';
// STATE
export interface SettingsState {
    UserName: string;
    User: ApplicationUser | null;
    errorMessage: string;
    ConfirmationField: string;
    Channels: Channel[] | null;
    AdminUsers: ApplicationUser[] | null;
}

// ACTION CREATORS
export const actionCreators = {
    LogOut: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        fetch('/User/Api/SignOut', requestOptions);
        dispatch({ type: 'LogOutClean' } as LogOutClean);
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

    UpdateUser: (formData: FormData): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            body: formData

        };
        return fetch('/User/Api/UpdateUser', requestOptions)
            .then(response => response.json() as Promise<ResponseUpdateUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseUpdateUser',
                    message: data.message,
                    status: data.status as Status,
                    User: data.User as ApplicationUser
                });
            });
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

    DeleteChannel: (UserId: string, channelId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
                ChannelId: channelId,
            })
        };
        return fetch('/Channel/Api/DeleteChannel', requestOptions)
            .then(response => response.json() as Promise<ResponseDeleteChannel>)
            .then(data => {
                dispatch({
                    type: 'ResponseDeleteChannel',
                    message: data.message,
                    status: data.status as Status,
                    Channels: data.Channels as Channel[]
                });
            })
    },

    GetAllUsers: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            })
        };
        return fetch('/User/Api/GetAllUsers', requestOptions)
            .then(response => response.json() as Promise<ResponseGetAllUsers>)
            .then(data => {
                dispatch({
                    type: 'ResponseGetAllUsers',
                    message: data.message,
                    status: data.status as Status,
                    Users: data.Users as ApplicationUser[]
                });
            })
            .catch(error => console.log("Not an Admin user"));
    },

    DeleteUser: (UserId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
            })
        };
        return fetch('/User/Api/DeleteUser', requestOptions)
            .then(response => response.json() as Promise<ResponseDeleteUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseDeleteUser',
                    message: data.message,
                    status: data.status as Status,
                    Users: data.Users as ApplicationUser[]
                });
            })
            .catch(error => console.log("Not an Admin user"));
    },


};

// REDUCER
export const reducer: Reducer<SettingsState> = (state: SettingsState | undefined, incomingAction: Action): SettingsState => {
    if (state === undefined) {
        return {
            UserName: "",
            User: null,
            errorMessage: "",
            ConfirmationField: "",
            Channels: null,
            AdminUsers: null
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseGetUser':
            console.log("[ResponseGetUser] response recived, with message: " + action.message)
            return {
                UserName: state.UserName,
                User: action.User,
                errorMessage: "",
                ConfirmationField: "",
                Channels: state.Channels,
                AdminUsers: state.AdminUsers,
            }
        case 'LogOutClean':
            console.log("[LogOutClean]");
            return {
                UserName: "",
                User: null,
                errorMessage: "",
                ConfirmationField: "",
                Channels: state.Channels,
                AdminUsers: null,
            };
        case 'ResponseUpdateUser':
            console.log("[ResponseUpdateUser] response recived, with message: " + action.message);
            let confirmation = "";
            let error = ""
            if (action.status === 0)
                confirmation = action.message
            else
                error = action.message
            return {
                UserName: state.UserName,
                User: action.User,
                errorMessage: error,
                ConfirmationField: confirmation,
                Channels: state.Channels,
                AdminUsers: state.AdminUsers,
            };
        case 'ResponseGetChannelsForUser':
            console.log("[ResponseGetChannelsForUser] response recived, with message: " + action.message)
            return {
                UserName: state.UserName,
                User: state.User,
                errorMessage: "",
                ConfirmationField: "",
                Channels: action.channels,
                AdminUsers: state.AdminUsers,
            }
        case 'ResponseGetAllUsers':
            console.log("[ResponseGetAllUsers] response recived, with message: " + action.message)
            return {
                UserName: state.UserName,
                User: state.User,
                errorMessage: "",
                ConfirmationField: "",
                Channels: state.Channels,
                AdminUsers: action.Users,
            }
        case 'ResponseDeleteUser':
            console.log("[ResponseDeleteChannel] response recived, with message: " + action.message)
            return {
                UserName: state.UserName,
                User: state.User,
                errorMessage: "",
                ConfirmationField: "",
                Channels: state.Channels,
                AdminUsers: action.Users,
            }
        default:
            return state;
    }
};



// ACTIONS
export type KnownAction = LogOutClean | ResponseGetUser | ResponseUpdateUser | ResponseGetChannelsForUser | ResponseDeleteChannel | ResponseDeleteUser | ResponseGetAllUsers;
export interface ResponseUpdateUser {
    type: 'ResponseUpdateUser',
    message: string,
    status: Status,
    User: ApplicationUser,
}

export interface ResponseDeleteChannel {
    type: 'ResponseDeleteChannel',
    message: string,
    status: Status,
    Channels: Channel[],
}

export interface ResponseDeleteUser {
    type: 'ResponseDeleteUser',
    message: string,
    status: Status,
    Users: ApplicationUser[],
}

export interface ResponseGetAllUsers {
    type: 'ResponseGetAllUsers',
    message: string,
    status: Status,
    Users: ApplicationUser[],
}
