import { ICartProduct } from '../../interfaces';
import { CartState } from './';


type ActionType = 
    | { type: '[Cart] Load Cart from cookies', payload: ICartProduct[] }
    | { type: '[Cart] Add Product', payload: ICartProduct[] }

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

        default:
            return state;
    }
}