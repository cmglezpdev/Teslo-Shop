import { createContext } from 'react';
import { IAddress, ICartProduct, ICartSummary } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    summary: ICartSummary;
    shippingAddress?: IAddress;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeProductCart: (product: ICartProduct) => void;
    updateAddress: (address: IAddress) => void
}


export const CartContext = createContext({} as ContextProps);