import { FC, ReactNode, useEffect, useReducer, useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { IAddress, ICartProduct, ICartSummary as ICartSummary } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { utilsProduct } from '../../services';
import tesloApi from '../../api/tesloApi';
import { IOrder } from '../../interfaces';

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
    const [firstLoad, setFirstLoad] = useState(true);

    // Load cart from cookies
    useEffect(() => {
        const cart = JSON.parse(Cookies.get('cart') || '[]');
        dispatch({ type: '[Cart] Load Cart from cookies', payload: cart })
    }, [])

    // Save cart in cookies when change the state
    useEffect(() => {
        if( firstLoad ) {
            setFirstLoad(false);
            return;
        }
        Cookies.set('cart', JSON.stringify(state.cart));
    }, [state.cart, firstLoad])

    // load address from cookies
    useEffect(() => {
        if( !Cookies.get('name') ) return;

        const address = {
            name      : Cookies.get('name')      || '',
            lastName  : Cookies.get('lastName')  || '',
            address   : Cookies.get('address')   || '',
            address_2 : Cookies.get('address_2') || '',
            zip       : Cookies.get('zip')       || '',
            country   : Cookies.get('country')   || '',
            city      : Cookies.get('city')      || '',
            phone     : Cookies.get('phone')     || '',
        }
        dispatch({ type: '[Cart] Load Address from Cookies', payload: address })
    }, [])

    // recalculation of summary with each change of the state
    useEffect(() => {
        const numberOfProducts = state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => current.price * current.quantity + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0); //TODO: obtener el tax desde el servidor(poder seleccionarlo desde el panel administrativo para cada producto)
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
            // if i have not a product equivale to this, add like a new product
            ? [product, ...state.cart]
            // updated a last product with the new quantity
            : state.cart.map(p => {
                if( p._id !== product._id ) return p;
                // TODO: Controlar que la cantidad no se mayor a la posible
                // TODO: Manejar la cantidad total por tallas(habría que cambiar la base de datos)
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
        Cookies.set('name',      address.name )
        Cookies.set('lastName',  address.lastName )
        Cookies.set('address',   address.address )
        Cookies.set('address_2', address.address_2 || '' )
        Cookies.set('city',      address.city )
        Cookies.set('country',   address.country )
        Cookies.set('zip',       address.zip )
        Cookies.set('phone',     address.phone )
        
        dispatch({ type: '[Cart] Updated Address', payload: address })
    }

    const createOrder = async(): Promise<{ hasError: boolean; message: string; }> => {

        if( !state.shippingAddress ) {
            throw new Error('There are not address')
        }

        const body:IOrder = {
            orderItems: state.cart,
            shippingAddress: state.shippingAddress,
            summary: state.summary,
            isPaid: false
        }
        try {
            const { data } = await tesloApi.post<IOrder>('/orders', body)
            
            dispatch({ type: '[Cart] Order complete' })

            return {
                hasError: false,
                message: data._id!
            }
        } catch (error) {
            if( axios.isAxiosError(error) )
                return {
                    hasError: true,
                    message: error.response?.data.message
                }            
            return {
                hasError: true,
                message: 'Error is not controlled, please contact with the administrator'
            }
        }
    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeProductCart,
            updateAddress,

            // Orders
            createOrder,
        }}>
            { children }
        </CartContext.Provider>
    )
}