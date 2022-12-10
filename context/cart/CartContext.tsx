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
    updateAddress: (address: IAddress) => void;

    // Orders
    createOrder: () => Promise<{
        hasError: boolean;
        message: string;
    }>
}


export const CartContext = createContext({} as ContextProps);