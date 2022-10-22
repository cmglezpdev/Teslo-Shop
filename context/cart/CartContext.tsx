import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];
    addProductToCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);