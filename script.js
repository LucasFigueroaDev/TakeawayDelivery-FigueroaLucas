// Funcion que muestra los combos
function mostrarCombos() {
    console.log('NUESTROS COMBOS SON:');
    for (const combo of combos) {
        console.log(`${combo.id} - ${combo.nombre} $${combo.precio}`);
    };
};

// Funcion para hacer el pedido
function hacerPedido() {
    while (true) {
        const eleccion = prompt('Elige un combo (ingresa el número) o escribe "fin" para terminar:');
        if (eleccion === 'fin' || eleccion === null) {
            break;
        };
        const comboElegido = combos[eleccion - 1];
        if (comboElegido) {
            combosElegidos.push(comboElegido);
            console.log(`Combo agregado: ${comboElegido.nombre}`);
        } else {
            console.log('Combo no encontrado, intenta de nuevo.');
        }
    };
    total = calcularImporteTotal(combosElegidos);
    enviar = confirm(`¿Quiere que se lo enviemos a su domicilio?. El envio cuesta $${envio}`);
    if (enviar == true){
        enviarADomicilio();
    }else alert(`En total es $${total}, estara listo en 20 minutos y podras retirarlo por nuestro local, Muchas gracias.`);
    
};

// función enviar a domicilio
function enviarADomicilio() {
        domicilio = prompt('¿Cual es su domicilio?');
        for (const combo of combosElegidos) {
            console.log(`Su pedido es: ${combo.nombre} $${combo.precio}`);
        }
        alert(`Se enviara a ${domicilio} y el total es: ${total + envio}`);
};

// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + array.precio, 0);
};

// Combos 
const combos = [
    { id: 1, nombre: "Lomitos2x1", precio: 9500 },
    { id: 2, nombre: "Hamburguesas2x1", precio: 8500 },
    { id: 3, nombre: "Hamburguesa+bebida", precio: 5500 },
    { id: 4, nombre: "2 Muzzarella", precio: 10500 },
    { id: 5, nombre: "Muzza+especial", precio: 13500 },
    { id: 6, nombre: "1/2 Doc. empanadas", precio: 4000 },
    { id: 7, nombre: "1 Doc. empanadas", precio: 7800 }
];

alert('Bienvenido a La casa de comida - Lo Más Rico');
let total = "";
let envio = 2000;
let combosElegidos = [];
let domicilio = "";
let pedido = confirm('¿Quiere realizar algún pedido?');
if (pedido == true) {
    mostrarCombos();
    hacerPedido();
} else {
    console.log('Tenemos varias ofertas para vos, APROVECHALAS!!!!');
};







