import mongoose, { Schema } from "mongoose";
import { ProductModel } from "../interface/products.interface";

const productSchema = new Schema({
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
    },
    tag: {
        type: String,
        required: true,
    },
    flashSale: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    parent: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
 
    sku: {
        type: String,
    },
});

export const Product = mongoose.model<ProductModel>("Product", productSchema);
    

