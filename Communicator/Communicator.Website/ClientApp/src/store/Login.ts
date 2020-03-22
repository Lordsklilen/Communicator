import { Action, Reducer } from 'redux';
import { AppThunkAction } from './index';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
// STATE
export interface LoginState {
    errorMessage:string
    userName: string
}

// ACTIONS
export interface ResponseAuthenticateAction {
    type: 'ResponseAuthenticate_action',
    message: string,
    status: Status,
    User: ApplicationUser

}

export type KnownAction = ResponseAuthenticateAction;

// ACTION CREATORS
export const actionCreators = {
    //RequestAuthenticate: (userName: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

    //    const requestOptions = {
    //        method: 'POST',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify({
    //            userName: userName,
    //            password: password
    //        })
    //    };
    //    fetch('/User/Api/Authenticate', requestOptions)
    //        .then(response => response.json() as Promise<ResponseAuthenticateAction>)
    //        .then(data => {
    //            var d = data.message;
    //            dispatch({
    //                type: 'ResponseAuthenticate_action',
    //                message: data.message,
    //                status: data.status as Status,
    //                User: data.User as ApplicationUser
    //            });
    //        });
    //}
};

// REDUCER
export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return {
            errorMessage: "",
            userName: ""
        };
    }
    return {
        errorMessage: "",
        userName: ""
    };
    //const action = incomingAction as KnownAction;
    //switch (action.type) {
    //    case 'ResponseAuthenticate_action':
    //        console.log("response recived, with message: " + action.message + ", with status: " + action.status)
    //        if (action.status === Status.Success) {
    //            (<HTMLParagraphElement>document.getElementById("UserName")).innerHTML = action.User.UserName;
    //            return {
    //                errorMessage: "",
    //                userName: action.User.UserName,
    //                redirect: true
    //            };
    //        }
    //        return {
    //            errorMessage: action.message,
    //            userName: "",
    //            redirect: false
    //        };
    //    default:
    //        return state;
    //}
};
