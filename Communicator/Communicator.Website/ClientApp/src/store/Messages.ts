import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
// STATE
export interface MessagesState {
    UserName: string;
    IsSignedIn: boolean;
    User: ApplicationUser | null;
    isOpen:boolean
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
export const actionCreators = {};

// REDUCER
export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return {
            UserName: "",
            IsSignedIn: false,
            User:null,
            isOpen: false
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        default:
            return state;
    }
};
