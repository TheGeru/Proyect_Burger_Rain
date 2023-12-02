var rutaCard = require("express").Router();
const ps = require("ps").promises;
const{
    mostrarProductos,
    buscarPorIDPro,
    modificarProducto,
    borrarProducto,
    nuevoProducto
} = require("../database/productosBD");

