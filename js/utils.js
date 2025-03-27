// Funcion de sweetalert notificación con tiempo
function msjAlert(msj) {
    Swal.fire({
        position: "top-end",
        title: msj,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
            title: 'title',
            popup: 'popup'
        }
    });
};

// Funcion de sweetAlert2 comfirma pago realizado
function confirmacion(msj) {
    Swal.fire({
        title: msj,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        customClass: {
            title: 'title',
            popup: 'popup',
            confirmButton: 'sweet-btn'
        }
    })
};

export { msjAlert, confirmacion };