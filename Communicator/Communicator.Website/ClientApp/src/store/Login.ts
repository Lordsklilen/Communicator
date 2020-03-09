import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface LoginState {
    email: string;
    password: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface UpdateAction { type: 'UPDATE_STORE' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = UpdateAction;

//// ----------------
//// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
//// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    updateEmail: () => ({ type: 'UPDATE_STORE' } as UpdateAction),
};

//// ----------------
//// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<LoginState> = (state: LoginState | undefined, incomingAction: Action): LoginState => {
    if (state === undefined) {
        return {
            email: "",
            password: ""
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'UPDATE_STORE':
            return { email: state.email, password: state.password };
        default:
            return state;
    }
};
