console.clear()
const Contenedor = require('./index');

const productos = new Contenedor('D:/coder-32155-backEnd/desafio2/productos.json');

const prueba = async () => {
    const data = await productos.save({ title: "anillo", price: 165.23, algoRandom: "algoRandom" });
    console.log(productos.objects);
}

prueba();