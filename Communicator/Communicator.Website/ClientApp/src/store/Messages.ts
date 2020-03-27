import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
import { AppThunkAction } from '.';
// STATE
export interface MessagesState {
    UserName: string;
    IsSignedIn: boolean;
    User: ApplicationUser | null;
    FriendsList: ApplicationUser[];
    Messages: [];
    SearchedFreinds: ApplicationUser[];
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

export type KnownAction = ResponseFriendsListAction | ResponseGetSearchUsers;

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
                let tmp = data.status;
                dispatch({
                    type: 'ResponseGetSearchUsers',
                    message: data.message,
                    status: data.status as Status,
                    users: data.users as ApplicationUser[]
                });
            });
    }
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
            Messages: [],
            SearchedFreinds: new Array(),
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
                isOpen: state.isOpen,
                FriendsList: state.FriendsList,
                Messages: state.Messages,
                SearchedFreinds: action.users
            }
        default:
            return state;
    }
};
