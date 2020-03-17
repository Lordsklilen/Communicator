import * as Login from "./Login";
import * as Register from "./Register";
import * as Messages from "./Messages";
import * as Layout from "./Layout";


export interface ApplicationState {
    login: Login.LoginState | undefined;
    register: Register.RegisterState | undefined;
    messages: Messages.MessagesState | undefined;
    layout: Layout.LayoutState | undefined;
}

export const reducers = {
    login: Login.reducer,
    register: Register.reducer,
    messages: Messages.reducer,
    layout: Layout.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
