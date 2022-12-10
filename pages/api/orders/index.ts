import type { NextApiRequest, NextApiResponse } from 'next'
import { jwt } from '../../../services';
import { Order, Product } from '../../../models';
import { IOrder } from '../../../interfaces';
import { db } from '../../../database';

type Data =
    | { message: string }
    | IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case "POST":
            return createOrder( req, res );
        
        default:
            res.status(400).json({ message: "Bad request" })
    }
}

async function createOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { orderItems, summary } = req.body as IOrder; 
    const { totalCost } = summary;
    let userId = null;
    
    // verify the user
    try {
        const { token } = req.cookies;
        if( !token ) throw new Error();
        userId = await jwt.isValidToken(token);
    } catch (error) {
        return res.status(401).json({ message: 'You must be authenticated' })
    }

    // verify products
    try {
        const productsIds = orderItems.map(p => p._id);
        await db.connect();
        const dbProducts = await Product.find({ _id: { $in: productsIds } });

        const subTotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod => prod.id === current._id)?.price; 
            
            if( !currentPrice ) 
                throw new Error('Verify the cart again, the product does not exist');

            return currentPrice * current.quantity + prev
        }, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal - subTotal * taxRate;

        if( totalCost != backendTotal ) {
            throw new Error('The total is different of the real cost');
        }

        // Verifications Passed

        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        await newOrder.save();

        return res.status(201).json( newOrder )    
    } catch (error: any) {
        
        console.log(error);
        return res.status(400).json({ message: error.message || 'See server logs' })
    }
}
