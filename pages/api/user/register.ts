import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';

type Data = 
    | { message: string }
    | { token: string, user: { email: string, role: string, name: string } }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return registerUser(req, res);
        default:
            res.status(400).json({
                message: 'Bad Request'
            })
    }

}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name = '', email = '', password = '' } = req.body as { name: string, password: string, email: string };
    
    await db.connect();
    const user = await User.findOne({ email }).lean();
    
    if( user ) {
        return res.status(400).json({ message: 'User already exists' })
    }
    
    if( password.length < 8 ) {
        return res.status(400).json({ message: 'Password must be at least eight characters' })
    }

    if( !validations.isValidEmail(email) ) {
        return res.status(400).json({ message: 'Email is not valid' })
    }
    
    const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client'
    })
    
    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'See logs of the server' })
    }

    const { _id } = newUser;
    return res.status(200).json({
        token: jwt.signToken(_id, email),
        user: {
            name,
            email, 
            role: 'client', 
        }
    }) 
}
