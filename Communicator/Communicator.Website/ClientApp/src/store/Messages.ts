import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { AppThunkAction } from '.';
import { ApplicationUser } from './Models/ApplicationUser';
// STATE
export interface MessagesState {
    UserName: string;
    IsSignedIn: boolean;
    User: ApplicationUser | null;
}

// ACTIONS
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

export type KnownAction = ResponseFriendsListAction | ResponseGetUser;

// ACTION CREATORS
export const actionCreators = {
    GetUser: (userName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {

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
                var d = data.message
                dispatch({
                    type: 'ResponseAuthenticate_action',
                    message: data.message,
                    status: data.status as Status,
                    User: data.User as ApplicationUser,
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
            User:null
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        default:
            return state;
    }
};
