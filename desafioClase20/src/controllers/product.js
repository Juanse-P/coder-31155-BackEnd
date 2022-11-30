import { json } from "express";
import { ProductsModel1 } from "../models/product.js";


export const getAll = async (req,res) => {
    try {
        const query = {};

        const products = await ProductsModel1.find(query);
        res.json({
            msg: products
        })
    } catch (error) {
        console.log(`error en getAll: ${error}`);
        res.status(500).json({
            error: error.message
        });
    }
}

export const getProductById = async (req,res) => {
    try {
        const {id} = req.params;
        const product = await ProductsModel1.findById(id);
        if (!product) {
            return res.status(404).json({
                msg: 'El producto con el id ingresado no existe'
            });
        } else {
            res.json({
                msg: product
            });
        }
    } catch (error) {
        console.log(`error en getProductById: ${error}`);
        res.status(500).json({
            error: error.message
        });
    }
};

export const save = async (req,res) => {
    try {
        const { name, description, code, image, price, stock } = req.body;
        const newProduct = await ProductsModel1.create({
            name,
            description,
            code,
            image,
            price,
            stock
        });

        res.status(201).json({
            msg: newProduct
        })
    } catch (error) {
        console.log(`error en save: ${error}`);
        res.status(500).json({
            error: error.message
        })
    }
}

export const updateProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const { name, description, code, image, price, stock } = req.body;

        const product = await ProductsModel1.findById(id);
        if (!product) {
            return res.status(404).json({
                msg: 'Producto con el id no escontrado'
            });
        } else {
            const productUpdated = await ProductsModel1.findByIdAndUpdate(
                id,
                { name, description, code, image, price, stock },
                { new: true }
            );
            res.json({
                msg: 'producto actualizada',
                data: productUpdated
            });
        }
    } catch (error) {
        console.log(`error en updateProduct: ${error}`);
        res.status(500).json({
            error: error
        })
    }
};

export const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;
        await ProductsModel1.findByIdAndDelete(id);
        res.json({
            msg: 'Producto eliminado correctamente'
        })
    } catch (error) {
        console.log(`Error en deleteProduct: ${error}`);
        res.status(500).json({
            error: error
        })
    }
}