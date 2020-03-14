import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';

// STATE
export interface MessagesState {
    email: string;
    password: string;
}

// ACTIONS
export interface RequestFriendsListAction {
    type: 'RequestCreateUserAction_action',
    email: string
    password: string
}

export interface ResponseFriendsListAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}

export type KnownAction = RequestFriendsListAction | ResponseFriendsListAction;

// ACTION CREATORS
export const actionCreators = {

};

// REDUCER
export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return {
            email: "",
            password: ""
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        default:
            return state;
    }
};
