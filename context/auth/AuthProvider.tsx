import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';


export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const INITIAL_STATE:AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const {} = useContext(AuthContext)
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
        }}>
            { children }
        </AuthContext.Provider>
    )
}