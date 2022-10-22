import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';


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

    const loginUser = async( email:string, password: string ):Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password })
            const { token, user } = data;

            Cookie.set('token', token);
            dispatch({ type: '[Auth] Login', payload: user })
            return true;

        } catch (error) {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
        }}>
            { children }
        </AuthContext.Provider>
    )
}