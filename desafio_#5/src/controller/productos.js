const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductosAPI {
    constructor() {
        this.productos = [
            {
                "titulo": "Escuadra",
                "precio": 123.45,
                "imagen": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                "id": 1
            },
            {
                "titulo": "Calculadora",
                "precio": 234.56,
                "imagen": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
                "id": 2
            },
            {
                "titulo": "Globo Terráqueo",
                "precio": 345.67,
                "imagen": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
                "id": 3
            }
        ];
    }
    exists(id) {
        const indice = this.productos.findIndex(aProduct => aProduct.id == id)
        console.log(indice);
        return indice >= 0;
    }

    validateBody(data) {
        if (!data.titulo || !data.precio || !data.imagen || typeof data.titulo !== 'string' /* || typeof data.precio !== 'number' */ || typeof data.imagen !== 'string') throw createError(400, 'datos invalidos, recuerde que se debe usar el formato de un titulo (Debe ser un string), un precio (que debe ser un numero) y el link a una imagen(que debe ser un string)');
    }
    getAll() {
        return this.productos;
    }
    getById(id) {
        const exist = this.exists(id);

        if (!exist) throw createError(404, 'el producto no existe, ingrese un id valido!');

        const indice = this.productos.findIndex(aProduct => aProduct.id == id);

        return this.productos[indice];
    }
    save(produ) {
        this.validateBody(produ);

        const nuevoProdu = {
            titulo: produ.titulo,
            precio: produ.precio,
            imagen: produ.imagen,
            id: uuidv4(),
        }

        this.productos.push(nuevoProdu);
        return nuevoProdu;
    }
    updateById(id, datosNuevos) {
        const exist = this.exists(id);

        if (!exist) throw createError(404, ' El producto no existe , ingrese un id valido!')

        const indice = this.productos.findIndex(aProduct => aProduct.id == id);
        const oldProduct = this.productos[indice];

        const nuevoProducto = {
            id: oldProduct.id,
            titulo: `${!datosNuevos.titulo ? oldProduct.titulo : datosNuevos.titulo}`,
            precio: parseInt(!datosNuevos.precio ? oldProduct.precio : datosNuevos.precio),
            imagen: `${!datosNuevos.imagen ? oldProduct.imagen : datosNuevos.imagen}`,
        }
        this.productos.splice(indice, 1, nuevoProducto);

        return nuevoProducto;
    }
    deleteById(id) {
        const exist = this.exists(id);
        if (!exist) return;

        const indice = this.productos.findIndex(aProduct => aProduct.id == id);

        this.productos.splice(indice, 1);
    }
}
const instanciaProductsApi = new ProductosAPI();

module.exports = {
    ProductsController: instanciaProductsApi
}