import { FC, ReactNode, useContext, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie'
import { ICartProduct, ICartSummary as ICartSummary } from '../../interfaces';
import { CartContext, cartReducer } from './';


export interface CartState {
    cart: ICartProduct[];
    summary: ICartSummary;
}


const INITIAL_STATE:CartState = {
    cart: [],
    summary: {
        numberOfProducts: 0,
        subTotal: 0,
        tax: 0,
        taxRate: 0,
        totalCost: 0
    }
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

    // TODO: Arreglar el error de cuando recargo el navegador este me borra las cookies
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {

        const numberOfProducts = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => current.price + prev, 0);
        const taxRate = 0.15; //TODO: obtener el tax desde el servidor(poder seleccionarlo desde el panel administrativo para cada producto)
        const tax = subTotal * taxRate;
        const totalCost = subTotal - tax;
        const summary: ICartSummary = {
            numberOfProducts,
            subTotal,
            taxRate,
            tax,
            totalCost,
        }
        dispatch({ type: '[Cart] Update Cart Summary', payload: summary })
    }, [state.cart])


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
        // console.log('guarde')
        // Cookie.set('cart', JSON.stringify(cart));
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] Change Quantity', payload: product })
    }

    const removeProductCart = (product: ICartProduct) => {
        dispatch({ type: '[Cart] Remove Product', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeProductCart
        }}>
            { children }
        </CartContext.Provider>
    )
}