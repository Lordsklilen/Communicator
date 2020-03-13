import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Status } from './Models/Status';

// STATE
export interface RegisterState {
    email: string;
    password: string;
}

// ACTIONS
export interface RequestCreateUserAction {
    type: 'RequestCreateUserAction_action',
    email: string
    password: string
}

export interface ResponseAuthenticateAction {
    type: 'ResponseCreateUserAction_action',
    message: string,
    status: Status
}

export type KnownAction = RequestCreateUserAction;

// ACTION CREATORS
export const actionCreators = {
    //RequestAuthenticate: (email: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

    //    const requestOptions = {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //            email: email,
    //            password: password
    //        })
    //    };
    //    fetch('/User/Api/Authenticate', requestOptions)
    //        .then(response => response.json() as Promise<ResponseAuthenticateAction>)
    //        .then(data => {
    //            dispatch({
    //                type: 'ResponseAuthenticate_action',
    //                message: data.message,
    //                status: data.status as Status
    //            });
    //        });
    //}
};

// REDUCER
export const reducer: Reducer<RegisterState> = (state: RegisterState | undefined, incomingAction: Action): RegisterState => {
    if (state === undefined) {
        return {
            email: "",
            password: ""
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        //case 'ResponseCreateUserAction_action':
        //    console.log("response recived, user registered)
        //    return { email: state.email, password: state.password };
        default:
            return state;
    }
};
