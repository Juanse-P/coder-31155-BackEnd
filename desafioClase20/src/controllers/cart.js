import { CartModel1 } from "../models/cart.js";
import moment from "moment"
import {
    getAll,
    getProductById,
    save,
    updateProduct,
    /* deleteProduct */
} from '../controllers/product.js';
import { ProductsModel1 } from "../models/product.js";

/* const getAllProducts = (id) => {
    CartModel1.findById(id).find({ products: {} });
};


const deleteProducts = async (idCart, idProduc) => {
    const cart = await CartModel1.findById(idCart);
    const index = await cart.product.finIndex(el => el._id == idProduc);
    await cart.products.splice(index, 1);
} */

export const addCart = async (req, res) => {
    try {
        const timesTamp = moment().format('DD-MM-YYYY HH:MM:SS');
        let products = [];
        await CartModel1.create({ timesTamp, products });
        res.json({
            msg: 'Carrito creado correctamente'
        })
    } catch (error) {
        console.log(`Error en addCart: ${error}`);
        req.status(500).json({
            error: error.message
        })
    }
}

export const deleteCart = async (req, res) => {
    try {
        await CartModel1.findByIdAndDelete(req.params.id);
        res.json({
            msg: 'Carrito eliminado correctamente'
        })
    } catch (error) {
        console.log(`error en deleteCart: ${error}`);
        req.status(404).json({
            msg: error.message
        })
    }
}

export const getProducts = async (req, res) => {
    try {
        const cartSelected = await CartModel1.findById(req.params.id);
        res.json({
            cartSelected
        })
    } catch (error) {
        console.log(`error en getProducts: ${error}`);
        res.json({
            error: error.message
        })
    }
}

/* const saveProductToCart = async (id, obj) => {
    try {
        const cart = await CartModel1.findById(id)
        cart.products.push(obj.productId);
        cart.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
} */

export const addProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body.id;

        let cart = await CartModel1.findById(id);
        if (!cart) {
            return res.status(404).json({
                msg: 'Carrito no encontrado',
            });
        }
        let produc = await ProductsModel1.findById(body);

        let products = cart.products;
        products.push(produc);
        if (!produc) {
            return res.status(404).json({
                msg: 'Producto no encontrado',
            });
        } else {
            const productAddedToCart = await CartModel1.findByIdAndUpdate(
                cart._id,
                { products },
                { new: true }
            );
            res.json({
                msg: 'Id de producto agregado correctamente',
                data: productAddedToCart
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            error: error.message
        })
    }
}
/* const deleteProductFromCart = async (id, productId) => {
    try {
        const cart = await CartModel1.findById(id);
        cart.products.remove(productId);
        cart.save();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
} */
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const id_prod = req.param.id_prod;

        let cart = await CartModel1.findById(id);

        if (!cart) {
            return res.status(404).json({
              msg: 'Carrito no encontrado',
            });
        }
        
            let products = cart.products;
            const filteredProducts = products.filter((item) => item._id !== id_prod);
            products = filteredProducts;
      
            const newCart = await CartModel1.findByIdAndUpdate(cart._id, {
              products,
            });
      
        res.json({
            msg: 'Producto eliminado correctamente',
            data: newCart
        })
          
        
    } catch (error) {
        console.log(error);
        res.json({
            error: error.message
        })
    }
}
/* export const createCart = async (req,res) => {
    try {
        const newCart = await CartModel1.create({
            timeStamp: moment().format('DD-MM-YYYY HH:MM:SS'),
            products: [],
        });
        res.json({
            msg: 'Se creo un carrito correctamente!',
            data: newCart
        })
    } catch (error) {
        console.log(`error en createCart: ${error}`);
        res.status(500).json({
            error: error.message
        })
    }
};

export const getAllProductsCart = async (req,res) => {
    try {
        const query = {}
        const data = await CartModel1.find(query);
        return data;
    } catch (error) {
        console.log(`Error al obtener todos los productos de los carritos: ${error}`);
    }
};

export const getCartById = async (req,res) => {
    try {
        const { id } = req.params.id;
        const cart = await CartModel1.findById(id);
        if (!cart) {
            return res.status(404).json({
                msg: 'El carrito con el id ingresado no existe'
            });
        } else {
            res.json({
                msg: cart
            });
        }
    } catch (error) {
        console.log(`error en getCartById: ${error}`);
        res.status(500).json({
            error: error.message
        });
    }
}; */