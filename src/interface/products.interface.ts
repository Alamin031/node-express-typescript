import { Document } from 'mongoose';

export interface ProductModel  {
    price: number;
    discount: number;
    tag: string;
    flashSale: string;
    status: string;
    description: string;
    image: string;
    originalPrice: number;
    parent: string;
    quantity: number;
    slug: string;
    title: string;
    type: string;
    unit: string;
    sku: string;

}