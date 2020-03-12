import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// STATE
export interface LoginState {
    email: string;
    password: string;
}

// ACTIONS
export interface RequestAuthenticateAction {
    type: 'RequestAuthenticate_action',
    email: string
    password: string
}
export interface ResponseAuthenticateAction {
    type: 'ResponseAuthenticate_action',
    message: string
}

export type KnownAction = RequestAuthenticateAction | ResponseAuthenticateAction;

// ACTION CREATORS
export const actionCreators = {
    RequestAuthenticate: (email: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch('/User/Api/Authenticate', requestOptions)
            .then(response => response.text())
            .then(data => {
                dispatch({ type: 'ResponseAuthenticate_action', message: data });
            });
    }
};

// REDUCER
export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return {
            email: "",
            password: ""
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseAuthenticate_action':
            console.log("response recived, with message: " + action.message)
            return { email: state.email, password: state.password };
        default:
            return state;
    }
};
