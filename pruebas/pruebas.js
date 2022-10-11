//Sincronismo: Ejecuta tarea por tarea esperando que acabe una para seguir con la otra.

/* const delaySincronico = (ret) => {
    for (let i = 0n; i < 40000000n; i++);
};

function hacerTareaSincronicamente(num) {
    console.log(new Date(), 'Haciendo Tarea', num);
    delaySincronico(100);
    console.log(new Date(), 'Tarea', num, 'finalizada');

}

console.log('Inicio Tareas');
hacerTareaSincronicamente(1);
hacerTareaSincronicamente(2);
hacerTareaSincronicamente(3);
hacerTareaSincronicamente(4);
console.log('Fin Tareas');
console.log('Otras Tareas'); */

//Asincronidmo: Se ejecuta una función y mientras esta responde las demas tambien se van ejecutando.

/* const delayASincronico = (timeDelay, f) => {
    setTimeout(f, timeDelay)
  };
  
  function hacerTareaASincronicamente(num) {
    console.log(new Date(), 'Haciendo Tarea', num);
    delayASincronico(100, () => console.log(new Date(), 'Tarea', num, 'finalizada'));
  }
  
  console.log('Inicio Tareas');
  hacerTareaASincronicamente(1);
  hacerTareaASincronicamente(2);
  hacerTareaASincronicamente(3);
  hacerTareaASincronicamente(4);
  console.log('Fin Tareas');
  console.log('Otras Tareas'); */

  /* const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const objetoFinal = {};

for (let i = 0; i < 10000; i++) {
    const resultado = between(1, 21);
    if (objetoFinal[resultado]) {
        //La clave ya existe o salio mas de una vez
        objetoFinal[resultado] = objetoFinal[resultado] + 1;
    } else {
        //La clave no existe aun
        objetoFinal[resultado] = 1;
    }
}

console.log(objetoFinal); */



/* const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const objetoFinal = {};

for (let i = 0; i < 10000; i++) {
    const resultado = between(1, 21);
    if (objetoFinal[resultado]) {
        //La clave ya existe o salio mas de una vez
        objetoFinal[resultado] = objetoFinal[resultado] + 1;
    } else {
        //La clave no existe aun
        objetoFinal[resultado] = 1;
    }
}

console.log(objetoFinal); */

/* arr.sort() ordena en orden alfabetico las cosas */
/* Se ordena bien asi: 
const pepe = [3,2,5,77,65,112,113]
const comp = (a,b) => {
    if(a < b) return -1;
    else 1;
} */