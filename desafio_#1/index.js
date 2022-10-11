class Usuario {
    constructor(nombre, apellido, libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }
    countMascotas() {
        return `${this.mascotas.length}`
    }
    addBook(nombre, autor) {
        this.libros.push({ nombre: nombre, autor: autor });
    }
    getBookNames() {
        return this.libros.map(libro => `${libro.nombre}`);
    }
}
const usuario1 = new Usuario(`Carlos`, `Gutierrez`);
console.log(usuario1.getFullName());
usuario1.addMascota(`firulais`);
usuario1.addMascota(`caballo`)
console.log(usuario1.countMascotas());
usuario1.addBook(`La divina comedia`, `Dante Alighieri`);
usuario1.addBook(`El ingenioso caballero Don Quijote de la Mancha`, `Miguel de Cervantes`)
console.log(usuario1.getBookNames());
console.log(usuario1.mascotas);
console.log(usuario1.libros);