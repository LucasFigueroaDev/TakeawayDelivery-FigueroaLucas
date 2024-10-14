# Carrito de Compras

Este proyecto es un **carrito de compras dinámico** desarrollado en **JavaScript** que permite a los usuarios agregar productos, gestionar cantidades, realizar pagos mediante diferentes métodos (tarjeta o efectivo) y seleccionar el tipo de entrega (retiro en local o envío a domicilio). Además, utiliza **localStorage** para guardar los datos del carrito entre sesiones.

## Funcionalidades Principales

- **Agregar productos** al carrito y visualizar el detalle de cada producto (nombre, precio, cantidad).
- **Modificar la cantidad** de productos directamente desde el carrito (sumar o restar).
- **Persistencia** del carrito utilizando localStorage, manteniendo los productos agregados tras recargar la página.
- **Cargar productos dinámicamente** desde un archivo JSON.
- **Finalizar la compra** con opción de seleccionar método de pago (tarjeta de crédito/débito o efectivo) y tipo de entrega (retiro en local o envío a domicilio).
- **Gestión dinámica** del total del carrito y notificaciones visuales al usuario.
- **Validaciones** y mensajes de alerta en caso de errores o datos incompletos.

## Tecnologías Utilizadas
- **JavaScript** Lógica del carrito y manejo del DOM.
- **SweetAlert2** Para las alertas y formularios interactivos.
- **LocalStorage** Para la persistencia de datos del carrito.
- **JSON** Para la carga dinámica de productos desde un archivo de datos.
- **Sass** Diseño y procesador de css.
- **HTML5 y CSS3** Estructura y diseño de la interfaz.