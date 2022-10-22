import { ICartProduct } from '../../interfaces';
import { CartState } from './';


type ActionType = 
    | { type: '[Cart] Load Cart from cookies', payload: ICartProduct[] }
    | { type: '[Cart] Add Product', payload: ICartProduct[] }
    | { type: '[Cart] Change Quantity', payload: ICartProduct }

export const cartReducer = (state: CartState, action:ActionType) => {
    switch( action.type ) {
        case '[Cart] Add Product':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] Load Cart from cookies':
            return {
                ...state,
                cart: action.payload
            }

        case '[Cart] Change Quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if( product._id !== action.payload._id ) return product;
                    if( product.size !== action.payload.size ) return product;
                    return {
                        ...product,
                        quantity: action.payload.quantity
                    }
                })
            }

        default:
            return state;
    }
}