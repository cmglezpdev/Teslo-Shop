import { IProduct } from '../interfaces';
import { Product } from '../models';
import { db } from './';


export const getProductBySlug = async ( slug: string ):Promise<IProduct | null> => {

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    
    if( !product ) {
        return null;
    }

    return JSON.parse( JSON.stringify( product ) );
}


interface ProductSlug {
    slug: string;
}

export const getAllPorductsSlugs = async(): Promise<ProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}


export const getProductByTerm = async (term: string):Promise<IProduct[]> => {
    await db.connect();
    term = term.toLowerCase();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title images price inStock slug -_id')
    .lean();

    await db.disconnect();

    return products;
}