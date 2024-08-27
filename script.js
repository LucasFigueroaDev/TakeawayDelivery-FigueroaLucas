const combos = [
    { id: 1, nombre: "Lomitos2x1", precio: 9500 },
    { id: 2, nombre: "Hamburguesas2x1", precio: 8500 },
    { id: 3, nombre: "Hamburguesa+bebida", precio: 5500 },
    { id: 4, nombre: "2 Muzzarella", precio: 10500 },
    { id: 5, nombre: "Muzza+especial", precio: 13500 },
    { id: 6, nombre: "1/2 Doc. empanadas", precio: 4000 },
    { id: 7, nombre: "1 Doc. empanadas", precio: 7800 }
];

const extras = [
    { id: 1, nombre: "Extra papas fritas", precio: 2000 },
    { id: 2, nombre: "Pote de mayonesa casera", precio: 800 },
    { id: 3, nombre: "Pote de salsa picante", precio: 1200 },
];

const bebidas = [
    { id: 1, nombre: "Coca Cola 1.5Lt", precio: 1500 },
    { id: 2, nombre: "Sprite 1.5Lt", precio: 1500 },
    { id: 3, nombre: "Fanta 1.5Lt", precio: 1500 },
    { id: 4, nombre: "Lata de cerveza", precio: 1800 }
];

// Funcion que calcula el importe total
function calcularImporteTotal(array) {
    return array.reduce((total, array) => total + array.precio, 0);
};

// Funcion que muestra los combos
function mostrarCombos() {
    console.log('NUESTROS COMBOS SON:');
    for (const combo of combos) {
        console.log(`${combo.id} - ${combo.nombre} $${combo.precio}`);
    };
    let pedido = prompt('¿Le gustaria realizar un pedido (ingrese si) o escribe "fin" para terminar?');
    if (pedido == "si" || pedido == "SI" || pedido == "Si"){
        hacerPedido();
    }else {console.log('Tenemos varias ofertas para vos, APROVECHALAS!!!!');
    }
};

// Funcion para hacer el pedido
function hacerPedido() {
    const combosElegidos = [];
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
    const total = calcularImporteTotal(combosElegidos);
    alert(`El total de su pedido es: $${total}`);

    const envio = confirm(`¿Desea que se lo enviemos a su domicilio? El envio sale $${envio}`);
    if (envio == "si" || envio == "SI" || envio == "si quiero"){
        let domicilio = prompt('¿Cual es su domicilio?');
        for (const combo of combosElegidos) {
            alert(`Su pedido es: ${combo.nombre} $${combo.precio}`);
        }
        alert(`Se enviara a ${domicilio} y el total es: ${total + envio}`);
        
    }else {
        console.log('Tu pedido estara listo en 20 minutos, podras retirarlo por nuestro local');
    }
};






let bienvenido = prompt('BIENVENIDO, ¿Te gustaria ver nuestros combos (ingresa si) o escribe "fin" para terminar?');
let envio = 2000;
if (bienvenido == 'si' || bienvenido == 'Si' || bienvenido == 'SI') {
    mostrarCombos();
} else console.log('No te olvides de visitar nuestros combos y aprovechar nuestras ofertas');








