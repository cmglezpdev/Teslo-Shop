import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import { v2 as cloundinary } from 'cloudinary'

cloundinary.config(process.env.CLOUDINARY_URL || '');

type Data = {
    message: string
}

export const config = {
    api: { bodyParser: false }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'POST':
            return uploadFile(req, res);

        default:
            res.status(400).json({ message: 'Bad Request' })       
    }
        
}

// save en hard disk
// const saveFile = async (file: formidable.File) => {
//     const data = fs.readFileSync(file.filepath);
//     fs.writeFileSync(`./public/${file.originalFilename}`, data);
//     fs.unlinkSync(file.filepath);
// }

const saveFile = async (file: formidable.File): Promise<string> => {
    const { secure_url } = await cloundinary.uploader.upload( file.filepath );
    return secure_url;
}

const parseFiles = async (req: NextApiRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async(error, fields, files) => {
            if (error) 
                reject(error)
            const filepath = await saveFile( files.file as formidable.File );
            resolve(filepath);
        })
    });
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const imageUrl = await parseFiles(req);
        
    res.status(200).json({ message: imageUrl })
}
