import { ICartProduct } from '../interfaces';


export const some = (productA:ICartProduct, productB:ICartProduct, fields: string):boolean => {
    const sfields = fields.split(' ');

    for(let i = 0; i < sfields.length; i ++) {
        const field = sfields[i];
        if( field.trim().length === 0 ) continue;

        type Field = keyof typeof productA; 

        if( productA[field as Field] !== productB[field as Field] )
            return false
    }

    return true;
}