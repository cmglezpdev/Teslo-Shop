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


export const isValidToken = ( token:string ):Promise<string> => {
    if( !process.env.JWT_SECREET_SEED ) {
        throw new Error('There are not jwt seed - See enviroment variables')
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECREET_SEED!, (error, payload) => {
                if( error ) 
                    return reject('JWT is not valid');
                    
                    const { _id } = payload as {_id: string};
                    resolve(_id);
                })
        } catch (error) {       
            reject('JWT is not valid');
        }
    })
}