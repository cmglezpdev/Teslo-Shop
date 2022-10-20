import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';


type Data = 
    | { message: string }
    | { products: IProduct[] }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getProducts(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }   
}

const getProducts = async (req:NextApiRequest, res:NextApiResponse) => {
  
    const { gender = 'all' } = req.query;

    const condition = ( gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`) )
                        ? { gender }
                        : {}

    await db.connect();
    const products = await Product.find(condition)
                                  .select('title images price inStock slug -_id')
                                  .lean();
    await db.disconnect();
    return res.status(200).json({ products })
}