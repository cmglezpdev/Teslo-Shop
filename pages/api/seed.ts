import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Country, Product, User } from '../../models';

type Data = {
  message: string
}

export default async function InsertSeedDatabase( req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production' ) 
    return res.status(401).json({ message: 'you do not have acces to this API' })
  
  try {
    await db.connect();
    
    await Product.deleteMany();
    await User.deleteMany();
    await Country.deleteMany();

    await Product.insertMany(seedDatabase.products);
    await User.insertMany(seedDatabase.users);
    await Country.insertMany(seedDatabase.countries)
    
    await db.disconnect();

    return res.status(200).json({ message: 'The database if fulled with data test' })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Error' })
  }
}
