import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { AuthContext, authReducer } from '.';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';
import axios from 'axios';


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

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {

        try {
            // the token is in the cookies
            const { data }  = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            console.log(user)
            Cookie.set('token', token);
            dispatch({ type: '[Auth] Login', payload: user as IUser });
            
        } catch (error) {
            // Cookie.remove('token')
        }
    }

    const loginUser = async( email:string, password: string ) => {
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
    const registerUser = async( name:string, email:string, password: string ):Promise<{ hasError: boolean, message?: string}> => {
        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password })
            const { token, user } = data;

            Cookie.set('token', token);
            dispatch({ type: '[Auth] Login', payload: user })
            return {
                hasError: false,
            };

        } catch (error) {
            return ( axios.isAxiosError(error) )
                ? {
                    hasError: true,
                    message: error.response?.data.message
                } : {
                    hasError: true,
                    message: 'Could not create the user | try again',
                }
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
        }}>
            { children }
        </AuthContext.Provider>
    )
}