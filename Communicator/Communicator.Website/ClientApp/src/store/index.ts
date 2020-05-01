import * as Login from "./Login";
import * as Register from "./Register";
import * as Messages from "./Messages";
import * as Settings from "./Settings";


export interface ApplicationState {
    login: Login.LoginState | undefined;
    register: Register.RegisterState | undefined;
    messages: Messages.MessagesState | undefined;
    settings: Settings.SettingsState | undefined;
}

export const reducers = {
    login: Login.reducer,
    register: Register.reducer,
    messages: Messages.reducer,
    settings: Settings.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
