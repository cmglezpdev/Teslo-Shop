import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    paidOrders: number; // idPaid true
    notPaidOrders: number;
    numberOfOrders: number;
    numberOfClients: number; // role: client
    numberOfProducts: number;
    productsWithNoInventary: number; // 0
    lowInventary: number; // productos con 10 o menos
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    db.connect();
    const response = await Promise.all([
        Order.find({ isPaid: true }).count(),
        await Order.count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count()
    ])

    const [
        paidOrders,
        numberOfOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventary,
        lowInventary,
    ] = response;
    const notPaidOrders = numberOfOrders - paidOrders;
    
    db.disconnect();
    res.status(200).json({
        paidOrders,
        notPaidOrders,
        numberOfOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventary,
        lowInventary
    })
}