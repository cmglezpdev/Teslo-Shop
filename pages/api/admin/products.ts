import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

type Data = 
    | { message: string }
    | IProduct[]
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getProducts(req, res);

        case 'PUT':
            return updateProduct(req, res);

        case 'POST':

        default:
            return res.status(400).json({ message: 'Bad Request' });
    }

    
}

async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    await db.connect();

    const products = await Product.find()
                        .sort({ title: 'asc' })
                        .lean();

    await db.disconnect(); 
    // TODO: Actualizar las imagenes

    res.status(200).json(products);
}  

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { _id = '', images = [] } = req.body as IProduct;
    
    console.log(_id);

    if( !isValidObjectId(_id) )
        return res.status(400).json({ message: 'Id Product is not valid' });
    
    if( images.length < 2 ) 
        return res.status(400).json({ message: 'At least two images are required' });
        
    // TODO: Tendremos localhost:3000//products/image.jpg
    
    try {
        await db.connect();
        const product = await Product.findById(_id);
        if(!product)  
            return res.status(400).json({ message: 'The product does not exist' });
            
        // TODO: Delete images from cloudinary
        
        await product.update(req.body);
        // await product.save();
        await db.disconnect();
        
        return res.status(200).json( product );
    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'See server logs' });  
    }
}

