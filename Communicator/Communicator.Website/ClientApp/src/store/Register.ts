import { Action, Reducer } from 'redux';

// STATE
export interface RegisterState {
    errorMessage: string;
    isOpen: boolean;
}

// ACTIONS

// ACTION CREATORS
export const actionCreators = {};

// REDUCER
export const reducer: Reducer<RegisterState> = (state: RegisterState | undefined, incomingAction: Action): RegisterState => {
    if (state === undefined) {
        return {
            errorMessage: "",
            isOpen: false
        };
    }
    return state;

};
