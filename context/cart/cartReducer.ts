import { ICartProduct, ICartSummary } from '../../interfaces';
import { CartState } from './';
import { utilsProduct } from '../../utils';


type ActionType = 
    | { type: '[Cart] Load Cart from cookies', payload: ICartProduct[] }
    | { type: '[Cart] Add Product', payload: ICartProduct[] }
    | { type: '[Cart] Remove Product', payload: ICartProduct }
    | { type: '[Cart] Change Quantity', payload: ICartProduct }
    | { type: '[Cart] Update Cart Summary', payload: ICartSummary }

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
                    if( !utilsProduct.some(product, action.payload, '_id size') ) return product
                    return {
                        ...product,
                        quantity: action.payload.quantity
                    }
                })
            }

        case '[Cart] Remove Product':
            return {
                ...state,
                cart: state.cart.filter(product => !utilsProduct.some(product, action.payload, '_id size'))
            }

        case '[Cart] Update Cart Summary':
            return {
                ...state,
                summary: action.payload
            }

        default:
            return state;
    }
}