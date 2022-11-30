import mongoose from "mongoose";
import { productsSchema } from "./product.js"


export const cartCollectionName = 'carts';

const cartSchema = new mongoose.Schema({
    timesTamp: { type: String, requires: true },
    products: [
        {
            type: [productsSchema],
            required: true
        }
    ]
})

export const CartModel1 = mongoose.model(
    cartCollectionName,
    cartSchema
);