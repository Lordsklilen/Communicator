import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';

// STATE
export interface MessagesState {
    UserName: string;
}

// ACTIONS

export interface ResponseFriendsListAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}

export type KnownAction = ResponseFriendsListAction;

// ACTION CREATORS
export const actionCreators = {

};

// REDUCER
export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return {
            UserName: ""
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        default:
            return state;
    }
};
