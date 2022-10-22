import { IUser } from "../../interfaces";
import { AuthState } from "./"


type ActionType = 
    | { type: '[Auth] Login', payload: IUser }
    | { type: '[Auth] Logout' }
    | { type: '[Auth] Revalidate Sesion', payload: IUser }

export const authReducer = (state: AuthState, action:ActionType) => {
    switch( action.type ) {
        case '[Auth] Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[Auth] Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined
            }

        default:
            return state;
    }
}