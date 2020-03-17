import { Action, Reducer } from 'redux';
import { AppThunkAction } from './index';
import { Status } from './Models/Status';

// STATE
export interface LayoutState {
    userName: string;
    isOpen: boolean;
    isSignedIn: boolean;
}

// ACTIONS
export interface ResponseIsAuthenticatedAction {
    type: 'ResponseAuthenticate_action',
    message: string,
    status: Status
}

export type KnownAction = ResponseIsAuthenticatedAction;

// ACTION CREATORS
export const actionCreators = {
    RequestAuthenticate: (userName: string, password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName: userName
            })
        };
        fetch('/User/Api/Authenticate', requestOptions)
            .then(response => response.json() as Promise<ResponseIsAuthenticatedAction>)
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
export const reducer: Reducer<LayoutState> = (state: LayoutState | undefined, incomingAction: Action): LayoutState => {
    if (state === undefined) {
        return {
            userName: "",
            isOpen: false,
            isSignedIn: false
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseAuthenticate_action':
            console.log("response recived, with message: " + action.message + ", with status: " + action.status)
            return {
                userName: state.userName,
                isOpen: false,
                isSignedIn: false
            };
        default:
            return state;
    }
};
