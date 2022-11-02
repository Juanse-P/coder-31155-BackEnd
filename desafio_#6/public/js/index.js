const formProducts = document.getElementById('formProducts');
const inputTitulo = document.getElementById('titulo');
const vistaProdu = document.getElementById('vistaProdu');
const inputPrecio = document.getElementById('precio');
const inputImagen = document.getElementById('imagen');

const chatForm = document.getElementById('chatForm');
const inputEmail = document.getElementById('email');
const inputMessage = document.getElementById('message');
const messageDiv = document.getElementById('chat');

const socket = io();

window.addEventListener('load', function (e) {
    socket.emit('newConnection');
});

socket.on('welcome', (data) => {
    alert(data);
})

formProducts.addEventListener('submit', (e) => {
    e.preventDefault();

    let newProdu = {
        titulo: inputTitulo.value,
        precio: inputPrecio.value,
        imagen: inputImagen.value,
    };

    socket.emit('addProduct', newProdu);

    inputTitulo.value = '';
    inputPrecio.value = '';
    inputImagen.value = '';
});
socket.on('lastProduct', (lastProduct) => {
    addNewProduct(lastProduct);
});

const addNewProduct = (lastProduct) => {
    const divCardProdu = document.createElement('div');
    divCardProdu.classList.add('producto', 'card')
    const divProduCard1 = document.createElement('div');
    divProduCard1.classList.add('centradi');
    const divProduCard2 = document.createElement('div');
    divProduCard2.classList.add('centradi');
    const divProduCard3 = document.createElement('div');
    divProduCard3.classList.add('centradi');
    const pTitulo = document.createElement('p');
    const pPrecio = document.createElement('p');
    const imgImagen = document.createElement('img');

    pTitulo.innerText = lastProduct.titulo;
    pPrecio.innerText = lastProduct.precio;

    imgImagen.setAttribute('src', lastProduct.imagen);
    imgImagen.setAttribute('width', '300px');

    divProduCard1.appendChild(pTitulo);
    divProduCard2.appendChild(pPrecio);
    divProduCard3.appendChild(imgImagen);

    divCardProdu.appendChild(divProduCard1);
    divCardProdu.appendChild(divProduCard2);
    divCardProdu.appendChild(divProduCard3);

    vistaProdu.appendChild(divCardProdu);

}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let message = {
        email: inputEmail.value,
        message: inputMessage.value,
    };
    socket.emit('sendMessage', message);

    /* inputEmail.value = ''; */
    inputMessage.value = '';
});

socket.on('lastMessage', (lastMessage) => {
    addNewMessage(lastMessage);
});

const addNewMessage = (lastMessage) => {
    const pEmail = document.createElement('p');
    const pTime = document.createElement('p');
    const pMessage = document.createElement('p');
    const finalMessage = document.createElement('div');
    const lineaFin = document.createElement('hr');

    pEmail.classList.add('emailUser');
    pTime.classList.add('horaa');
    pMessage.classList.add('mensajeFinalEnviado');

    pEmail.innerText = lastMessage.email;
    pTime.innerText = ` [ ${lastMessage.time} ] :  `;
    pMessage.innerText = `${lastMessage.message}`;

    finalMessage.appendChild(pEmail);
    finalMessage.appendChild(pTime);
    finalMessage.appendChild(pMessage);
    finalMessage.appendChild(lineaFin);

    finalMessage.classList.add('mensajeFinal');
    messageDiv.appendChild(finalMessage);
}