import { ISize } from "./";

export interface ICartProduct {
    _id: number;
    images: string;
    inStock: number;
    price: number;
    size?: ISize;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex';
    quantity: number;
}


// TODO: crear una jerarquia de interfaces para no copiar constantemente los campos