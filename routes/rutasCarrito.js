var rutaCard = require("express").Router();
var subirArchivos = require("../middlewares/shoppingCar");
const fs = require("fs").promises;
const {
    
} = require("../database/carrito");

module.exports = rutaCard;