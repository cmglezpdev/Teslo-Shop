import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
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

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])


    const addProductToCart = (product: ICartProduct) => {
        
        // if i have not a product equival to this, add like a new product
        if( !state.cart.some(p => p._id === product._id && p.size === product.size) ) {
            dispatch({ type: '[Cart] Add Product', payload: [product, ...state.cart] })
            return;
        }

        // updated a last product with the new quantity
        dispatch({
            type: '[Cart] Add Product',
            payload: state.cart.map(p => {
                if( p._id !== product._id ) return p;
                // TODO: Controlar que la cantidad no se mayor a la posible
                // TODO: Manejar la cantidad total por tallas(habria que cambiar la base de datos)
                return { ...p, quantity: p.quantity + product.quantity }
            })
        })

    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
        }}>
            { children }
        </CartContext.Provider>
    )
}