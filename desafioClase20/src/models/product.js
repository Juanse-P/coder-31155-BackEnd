import mongoose from "mongoose";


export const productsCollectionName = 'productos';

export const productsSchema = new mongoose.Schema({
	name: { type: String, require: true },
	description: { type: String, require: true },
	code: { type: String, require: true },
	image: { type: String, require: true },
	price: { type: Number, require: true },
	stock: { type: Number, require: true }
});

export const ProductsModel1 = mongoose.model(
	productsCollectionName,
	productsSchema
);