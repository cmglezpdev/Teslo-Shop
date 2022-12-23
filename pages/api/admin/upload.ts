import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'

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
const saveFile = async (file: formidable.File) => {
    const data = fs.readFileSync(file.filepath);
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    fs.unlinkSync(file.filepath);
}

const parseFiles = async (req: NextApiRequest) => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, async(error, fields, files) => {
            if (error) 
                reject(error)
            await saveFile( files.file as formidable.File );
            resolve(true);
        })
    });
}

async function uploadFile(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    console.log('sdgshsdjdjkfs');
    await parseFiles(req);
        
    res.status(200).json({ message: 'Uploaded Image' })
}
