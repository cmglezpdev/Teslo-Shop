import jwt from 'jsonwebtoken';


export const signToken = (_id: string, email: string) => {
    
    if( !process.env.JWT_SECREET_SEED ) {
        throw new Error('There are not jwt seed - See enviroment variables')
    }

    return jwt.sign(
        // payload
        { _id, email},
        // Seed
        process.env.JWT_SECREET_SEED,
        // Options
        { expiresIn: '30d' }
    )
}