import { isValidObjectId } from "mongoose";
import { Order } from '../models';
import { IOrder } from "../interfaces";
import { db } from './';


export const getOrderById = async (id: string): Promise<IOrder | null> => {

    if( !isValidObjectId(id) )
        return null;

    await db.connect();
    const order = await Order.findById(id).lean();
    await db.disconnect();

    if( !order ) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));
}

export const getOrdersFromUser = async (userId:string): Promise<IOrder[] | null> => {
    if( !isValidObjectId(userId) )
        return null;

    await db.connect();
    const orders = await Order.find({ user: userId }).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(orders));
}
