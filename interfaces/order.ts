import { IUser, IAddress } from '.';

export interface IOrder {
    _i?             : string;
    user?           : IUser | string;
    orderItems      : IOrderItem[];
    shippingAddress : IAddress;
    paymentResult?  : string;
    numberOfItems   : number;
    subTotal        : number;
    tax             : number;
    total           : number;
    isPay           : boolean;
    padidAt?        : string;
}

export interface IOrderItem {
    _id      : string;
    title    : string;
    size     : string;
    quantity : number;
    slug     : string;
    image    : string;
    price    : number;
}
