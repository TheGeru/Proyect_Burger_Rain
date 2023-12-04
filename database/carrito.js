var conexion = require("./conexionCar");
var carrProduct = require("../models/Carrito");
async function addToCart(idusuario, datos){
    var newCar = new ShopingCar(null, datos);
    var error = 1;
    if ( newCar && newCar.bandera == 0){
        try{
            await conexion.doc().set(newCar.obtenerData)
            console.log("Producto añadido al carrito");
            error = 0;
        } catch(err){
            console.log("Error al añadir al carrito" + err);
        }
    }
    return error;
}

module.exports = addToCart;