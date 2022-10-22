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
        console.log('carge');
        try {
            const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({ type: '[Cart] Load Cart from cookies', payload: cart })
        } catch (error) {
            dispatch({ type: '[Cart] Load Cart from cookies', payload: [] })
        }
    }, [])

    const addProductToCart = (product: ICartProduct) => {
        
        const foundedProduct = state.cart.some(p => p._id === product._id && p.size === product.size);

        const cart = !foundedProduct
            // if i have not a product equival to this, add like a new product
            ? [product, ...state.cart]
            // updated a last product with the new quantity
            : state.cart.map(p => {
                if( p._id !== product._id ) return p;
                // TODO: Controlar que la cantidad no se mayor a la posible
                // TODO: Manejar la cantidad total por tallas(habria que cambiar la base de datos)
                return { ...p, quantity: p.quantity + product.quantity }
            })

        dispatch({ type: '[Cart] Add Product', payload: cart })
        console.log('guarde')
        Cookie.set('cart', JSON.stringify(cart));
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