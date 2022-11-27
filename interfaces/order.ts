import { IUser, IAddress, ICartProduct, ICartSummary } from './';

export interface IOrder {
    _i?             : string;
    user?           : IUser | string;
    orderItems      : ICartProduct[];
    shippingAddress : IAddress;
    paymentResult?  : string;
    summary         : ICartSummary;
    isPaid          : boolean;
    paidAt?        : string;
}

