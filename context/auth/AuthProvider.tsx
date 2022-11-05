import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Cookie from 'js-cookie'
import axios from 'axios';
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

    const router = useRouter();
    const { data, status } = useSession();
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    useEffect(() => {
        if( status  == 'authenticated' ) {
            dispatch({type: '[Auth] Login', payload: data?.user as IUser}) 
            console.log(data.user)
        }
    }, [ status, data ])


    // useEffect(() => {
    //     checkToken()
    // }, [])

    const checkToken = async () => {

        if( !Cookie.get('token') ) return;

        try {
            // the token is in the cookies
            const { data }  = await tesloApi.get('/user/validate-token');
            const { token, user } = data;
            Cookie.set('token', token);
            dispatch({ type: '[Auth] Login', payload: user as IUser });
            
        } catch (error) {
            Cookie.remove('token')
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
    const logoutUser = () => {
        Cookie.remove('cart');
        Cookie.remove('name')
        Cookie.remove('lastName')
        Cookie.remove('address')
        Cookie.remove('address_2')
        Cookie.remove('city')
        Cookie.remove('country')
        Cookie.remove('zip')
        Cookie.remove('phone')
        signOut();
        // the AuthContext and CartContext delete automatically them states
        // Cookie.remove('token');
        // router.reload();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logoutUser
        }}>
            { children }
        </AuthContext.Provider>
    )
}