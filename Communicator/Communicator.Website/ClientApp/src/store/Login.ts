import { Action, Reducer } from 'redux';
// STATE
export interface LoginState {
    errorMessage:string
    userName: string
    isOpen: boolean
}

// ACTIONS


// ACTION CREATORS
export const actionCreators = {};

// REDUCER
export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return {
            errorMessage: "",
            userName: "",
            isOpen: false
        };
    }
    return state;
};
