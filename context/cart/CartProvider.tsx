import { FC, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie'
import { IAddress, ICartProduct, ICartSummary as ICartSummary } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { utilsProduct } from '../../services';


export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    summary: ICartSummary;
    shippingAddress?: IAddress;
}


const INITIAL_STATE:CartState = {
    isLoaded: false,
    cart: [],
    summary: {
        numberOfProducts: 0,
        subTotal: 0,
        tax: 0,
        taxRate: 0,
        totalCost: 0
    },
    shippingAddress: undefined
}

export const CartProvider:FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const [fristLoad, setFristLoad] = useState(true);

    useEffect(() => {
        const cart = JSON.parse(Cookies.get('cart') || '[]');
        dispatch({ type: '[Cart] Load Cart from cookies', payload: cart })
    }, [])

    useEffect(() => {
        if( fristLoad ) {
            setFristLoad(false);
            return;
        }
        Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart, fristLoad])

    useEffect(() => {
        const defaultAddress:IAddress = {
            name: '',
            lastName: '',
            address: '',
            address_2: '',
            zip: '',
            country: 'US',
            city: '',
            phone: '',
        }
        const address = JSON.parse(Cookies.get('address') || JSON.stringify(defaultAddress));
        dispatch({ type: '[Cart] Load Address from Cookies', payload: address })
    }, [])

    useEffect(() => {
        const numberOfProducts = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
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
        
        const foundedProduct = state.cart.some(p => utilsProduct.some(p, product, '_id size'));

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
        // Cookies.set('cart', JSON.stringify(cart));
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] Change Quantity', payload: product })
    }

    const removeProductCart = (product: ICartProduct) => {
        dispatch({ type: '[Cart] Remove Product', payload: product })
    }

    const updateAddress = ( address: IAddress ) => {
        Cookies.set('address', JSON.stringify( address ))
        dispatch({ type: '[Cart] Updated Address', payload: address })
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeProductCart,
            updateAddress
        }}>
            { children }
        </CartContext.Provider>
    )
}