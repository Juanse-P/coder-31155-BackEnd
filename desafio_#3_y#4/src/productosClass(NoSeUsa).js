/* class Producto {
    constructor(id, titulo, precio, imagen) {
        this.id = id;
        this.tutilo = titulo;
        this.precio = precio;
        this.imagen = imagen;
    }
    getById(id, productosArray) {
        try {
            const obj = productosArray.find(el => el.id === Number(id));
            return obj ? obj : null;
        }catch (error) {
                throw new Error(error);
        }
    }

    saveProdu(getBody, productosArray) {
        try{
            let id = 1;
            if (productosArray.length) {
                id = productosArray[productosArray.length - 1].id + 1;
            }
            const productoNuevo = {
                id: id,
                titulo: getBody.titulo,
                precio: getBody.precio,
                imagen: getBody.imagen                
            };
            productosArray.push(productoNuevo);
            return productoNuevo;
        } catch (error) {
            throw new Error('Los datos ingresados no son duficientes, estan incorrectos o ha ocurrido un error en el proceso', error);
        }
    }
    actualizarProducto(id, getBody, productosArray) {
        let verificaId = false;
        try {
            productosArray.forEach(prod => {
                if (prod.id === id) {
                    prod.titulo = getBody.titulo;
                    prod.precio = getBody.precio;
                    prod.imagen = getBody.imagen;
                    verificaId = true;
                }                
            });
            if(!verificaId){
                throw new Error('El id introducido no existe, pruebe con un Id que sea valido!');
            }
        } catch (error) {
            throw new Error('Ocurrio un problema al actualizar el rpoducto solicitado', error);
        }
    }
    deleteById(id, productosArray) {
        try {
            const i = productosArray.findIndex((prod) => productosArray.id === id);

            if (i < 0) {
                throw new Error('El producto con el Id ingresado no existe, ingrese un Id valido');
            }
            productosArray.splice(i, 1);
        } catch (error) {
            throw new Error('Ocurrio un problema al eliminar el producto solicitado', error);
        }
    }
}

module.exports = Producto; */