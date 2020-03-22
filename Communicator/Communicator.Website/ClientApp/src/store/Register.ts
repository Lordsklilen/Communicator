import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Status } from './Models/Status';

// STATE
export interface RegisterState {
    errorMessage: string;
}

// ACTIONS
export interface RequestCreateUserAction {
    type: 'RequestCreateUserAction_action',
    email: string
    password: string
}

export interface ResponseCreateUserAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}

export type KnownAction = RequestCreateUserAction | ResponseCreateUserAction;

// ACTION CREATORS
export const actionCreators = {

};

// REDUCER
export const reducer: Reducer<RegisterState> = (state: RegisterState | undefined, incomingAction: Action): RegisterState => {
    if (state === undefined) {
        return {
            errorMessage: ""
        };
    }
    return state;

};
