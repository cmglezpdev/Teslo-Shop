import { FC, ReactNode, useContext, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
    cart: ICartProduct[];
}


const INITIAL_STATE:CartState = {
    cart: []
}

export const CartProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const {} = useContext(CartContext)
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    return (
        <CartContext.Provider value={{
            ...state
        }}>
            { children }
        </CartContext.Provider>
    )
}