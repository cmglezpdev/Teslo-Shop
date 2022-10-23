import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Country } from '../../../models';

type Data = 
    | { message: string }
    | { products: IProduct[] }

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getAllCountries(req, res);

        default:
            res.status(400).json({ message: 'Bad Request' })
    }
}

const getAllCountries = async (req: NextApiRequest, res: NextApiResponse) => {
    db.connect();
    try {
        const countries = await Country.find().lean();
        db.disconnect();
        return res.status(200).json( countries )
    } catch (error) {
        db.disconnect();
        return res.status(500).json({ message: 'Internal Error' })
    }
}