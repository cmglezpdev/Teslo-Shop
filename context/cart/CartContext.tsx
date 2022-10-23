import { createContext } from 'react';
import { ICartProduct, ICartSummary } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    summary: ICartSummary;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeProductCart: (product: ICartProduct) => void;
}


export const CartContext = createContext({} as ContextProps);