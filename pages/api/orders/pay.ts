import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return PayOrder(req, res);
        
        default:
            res.status(400).json({ message: 'Bad request' })
    }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET_ID = process.env.PAYPAL_SECRET_ID;

    const base64Token = Buffer.from(`${ PAYPAL_CLIENT_ID }:${PAYPAL_SECRET_ID}`, 'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                'Authorization': `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return data.access_token;
    } catch (error) {
        if( axios.isAxiosError(error) )
            console.log(error.response?.data);  
        else 
            console.log(error);
        
        return null;
    }
}

async function PayOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
    const paypalBearerToken = await getPayPalBearerToken();
    
    if( !paypalBearerToken ) {
        return res.status(400).json({ message: 'Invalid Paypal Token' })
    }
    
    res.status(200).json({ message: paypalBearerToken })
}
