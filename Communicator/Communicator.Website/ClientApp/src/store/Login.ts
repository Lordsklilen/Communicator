import { Action, Reducer } from 'redux';
import { AppThunkAction } from './index';
import { Status } from './Models/Status';

// STATE
export interface LoginState {
    userName: string;
    password: string;
    redirect: boolean;
}

// ACTIONS
export interface RequestAuthenticateAction {
    type: 'RequestAuthenticate_action',
    userName: string
    password: string
}

export interface ResponseAuthenticateAction {
    type: 'ResponseAuthenticate_action',
    message: string,
    status: Status

}

export type KnownAction = RequestAuthenticateAction | ResponseAuthenticateAction;

// ACTION CREATORS
export const actionCreators = {
    RequestAuthenticate: (userName: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        };
        fetch('/User/Api/Authenticate', requestOptions)
            .then(response => response.json() as Promise<ResponseAuthenticateAction>)
            .then(data => {
                dispatch({
                    type: 'ResponseAuthenticate_action',
                    message: data.message,
                    status: data.status as Status
                });
            });
    }
};

// REDUCER
export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return {
            userName: "",
            password: "",
            redirect: false
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseAuthenticate_action':
            console.log("response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                userName: state.userName,
                password: state.password,
                redirect: true
            };
        default:
            return state;
    }
};
