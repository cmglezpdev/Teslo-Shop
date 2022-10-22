import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data = 
    | { message: string }
    | { token: string, user: { email: string, role: string, name: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return checkJWT(req, res);
        default:
            res.status(400).json({
                message: 'Bad Request'
            })
    }

}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { token = '' } = req.cookies;

    let userId = '';
    try {
        userId = await jwt.isValidToken( token );
        
        await db.connect();
        const user = await User.findById( userId ).lean();
        await db.disconnect();

        if( !user )
            return res.status(400).json({ message: 'There is not exists an user with than id' })

        const { _id, name, email, role } = user;

        return res.status(200).json({
            token: jwt.signToken(_id, email), // create a new JWT
            user: {
                name, email, role
            }
        }) 

    } catch (error) {
        return res.status(401).json({ message: 'The autorization token is not valid' })
    }
}
