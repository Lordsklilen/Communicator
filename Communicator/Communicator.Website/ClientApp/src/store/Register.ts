import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Status } from './Models/Status';

// STATE
export interface RegisterState {
    errorMessage: string;
    redirect: boolean
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
    RequestCreateUser: (userName: string,email: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password
            })
        };
        fetch('/User/Api/CreateUser', requestOptions)
            .then(response => response.json() as Promise<ResponseCreateUserAction>)
            .then(data => {
                dispatch({
                    type: 'ResponseCreateUserAction_action',
                    message: data.message,
                    status: data.status as Status
                });
            });
    }
};

// REDUCER
export const reducer: Reducer<RegisterState> = (state: RegisterState | undefined, incomingAction: Action): RegisterState => {
    if (state === undefined) {
        return {
            errorMessage: "",
            redirect: false
        };
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseCreateUserAction_action':
            console.log("response recived,User Registered with message: " + action.message + ", with status: " + action.status)
            if (action.status === 0) {
                return {
                    errorMessage: "",
                    redirect: true
                };
            }
            return {
                errorMessage: action.message,
                redirect: false
            };

        default:
            return state;
    }
};
