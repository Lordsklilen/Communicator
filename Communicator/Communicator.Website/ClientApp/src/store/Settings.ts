import { Action, Reducer } from 'redux';
import { Status } from './Models/Status';
import { ApplicationUser } from './Models/ApplicationUser';
import { AppThunkAction } from '.';
import { LogOutClean, ResponseGetUser } from './Messages';
import '../styles/Login.css';
import '../styles/ChatMessages.css';
import '../styles/Search.css';
// STATE
export interface SettingsState {
    UserName: string;
    User: ApplicationUser | null;
    errorMessage: string;
    ConfirmationField: string;
}

// ACTION CREATORS
export const actionCreators = {
    LogOut: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        fetch('/User/Api/SignOut', requestOptions);
        dispatch({ type: 'LogOutClean' } as LogOutClean);
    },
    GetUser: (UserId: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                UserId: UserId,
            })
        };
        return fetch('/User/Api/GetUser', requestOptions)
            .then(response => response.json() as Promise<ResponseGetUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseGetUser',
                    message: data.message,
                    status: data.status as Status,
                    User: data.User as ApplicationUser
                });
            });
    },
    UpdateUser: (formData: FormData): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const requestOptions = {
            method: 'POST',
            body: formData
            
        };
        return fetch('/User/Api/UpdateUser', requestOptions)
            .then(response => response.json() as Promise<ResponseUpdateUser>)
            .then(data => {
                dispatch({
                    type: 'ResponseUpdateUser',
                    message: data.message,
                    status: data.status as Status,
                    User: data.User as ApplicationUser
                });
            });
    },

};

// REDUCER
export const reducer: Reducer<SettingsState> = (state: SettingsState | undefined, incomingAction: Action): SettingsState => {
    if (state === undefined) {
        return {
            UserName: "",
            User: null,
            errorMessage: "",
            ConfirmationField: "",
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ResponseGetUser':
            console.log("[ResponseGetUser] response recived, with message: " + action.message)
            return {
                UserName: state.UserName,
                User: action.User,
                errorMessage: "",
                ConfirmationField: "",
            }
        case 'LogOutClean':
            console.log("[LogOutClean]");
            return {
                UserName: "",
                User: null,
                errorMessage: "",
                ConfirmationField: "",
            };
        case 'ResponseUpdateUser':
            console.log("[ResponseUpdateUser] response recived, with message: " + action.message);
            let confirmation = "";
            let error = ""
            if (action.status === 0)
                confirmation = action.message
            else
                error = action.message
            return {
                UserName: "",
                User: action.User,
                errorMessage: error,
                ConfirmationField: confirmation,
            };
        default:
            return state;
    }
};



// ACTIONS
export type KnownAction = LogOutClean | ResponseGetUser | ResponseUpdateUser;
export interface ResponseUpdateUser{
    type: 'ResponseUpdateUser',
    message: string,
    status: Status,
    User: ApplicationUser,
}
