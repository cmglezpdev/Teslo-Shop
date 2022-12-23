import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces';

import { v2 as cloundinary } from 'cloudinary'
cloundinary.config(process.env.CLOUDINARY_URL || '');


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
            return createProduct(req, res);

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
    const updatedProducts = products.map( product => {
        product.images = product.images.map( img => {
            return img.includes('http') ?
                img :
                `${process.env.HOST_NAME}products/${img}`;
        })

        return product;
    })

    res.status(200).json(updatedProducts);
}  

async function updateProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { _id = '', images = [] } = req.body as IProduct;
    
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
            
        // https://res.cloudinary.com/dofsbymp4/image/upload/v1671832148/ujxxcqehs4b9as05t4it.jpg
        product.images.forEach(async(image:string) => {
            if( !images.includes(image) ) {
                // Delete clouldinary image
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.');
                await cloundinary.uploader.destroy( fileId );
            }
        })
        
        await product.update(req.body);
        // await product.save();
        await db.disconnect();
        
        return res.status(200).json( product );
    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'See server logs' });  
    }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { images = [] } = req.body as IProduct;
    
    if( images.length < 2 )
        return res.status(400).json({ message: 'At least two images are required' });
    
        // TODO: localhost:3000//products/image.jpg

    try {
        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if( productInDB )
            return res.status(400).json({ message: 'The product already exists' });

        const product = new Product(req.body);
        await product.save();

        await db.disconnect();
        return res.status(201).json( product );

    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'See server logs' });
    }
}

