var rutaUsu = require("express").Router();
var subirArchivo = require("../middlewares/subirArchivo");
const{
    buscarPorID,
    buscarPorUsuario,
    borrarUsuario,
    mostrarUsuarios,
    modificarUsuario,
    verificarPassword,
}=require("../database/usuariosBD");

const{
    encriptarPassword,
    autorizado,
    admin
}= require("../middlewares/funcionesPassword");

const{
    mostrarProductos,
    buscarPorIDPro
} = require("../database/productosBD");


/*COMIENZO DE DEFINICION DE RUTAS----------------------
------------------------------------------------------------------
--------------------------------------------------------------------------* */

rutaUsu.get("/perfilUsu", async(req, res)=>{
    var productos = await mostrarProductos();
    res.render("usuarios/inicioUsuario", {productos});
});

rutaUsu.get("/infoProd", (req, res)=>{
    res.render("usuarios/infoProduct");
});

module.exports= rutaUsu;