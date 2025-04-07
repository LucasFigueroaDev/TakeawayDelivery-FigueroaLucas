import { cartProducts } from "./utils.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];

cartProducts(cart);