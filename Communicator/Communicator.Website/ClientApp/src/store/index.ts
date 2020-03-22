import * as Login from "./Login";
import * as Register from "./Register";
import * as Messages from "./Messages";


export interface ApplicationState {
    login: Login.LoginState | undefined;
    register: Register.RegisterState | undefined;
    messages: Messages.MessagesState | undefined;
}

export const reducers = {
    login: Login.reducer,
    register: Register.reducer,
    messages: Messages.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
