import { IUser, IAddress, ICartProduct, ICartSummary } from './';

export interface IOrder {
    _id?            : string;
    user?           : IUser | string;
    orderItems      : ICartProduct[];
    shippingAddress : IAddress;
    paymentResult?  : string;
    summary         : ICartSummary;
    isPaid          : boolean;
    paidAt?         : string;
    transactionId?  : string;

    createdAt       : string;
}

