import brcypt from 'bcryptjs';

export interface SeedUser {
    name:     string;
    email:    string;
    password: string;
    role:     'admin' | 'client';
}



export const users:SeedUser[] = [
    {
        name: 'Carlos Manuel',
        email: 'carlos@google.com',
        password: brcypt.hashSync('123456789'),
        role: 'admin'
    },
    {
        name: 'Eduardo Rios',
        email: 'eduardo@google.com',
        password: brcypt.hashSync('123456789'),
        role: 'client'
    },    
];