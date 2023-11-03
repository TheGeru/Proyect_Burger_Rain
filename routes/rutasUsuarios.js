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
rutaUsu.get("/perfilUsuario", async(req, res)=>{
    var productos = await mostrarProductos();
    res.render("usuarios/inicioUsuario", {productos});
});

rutaUsu.get("/opciones", (req, res)=>{
    //var usuario = req.session.usuario;
    res.render("usuarios/OpcionesUsuario");
});

rutaUsu.get("/infoProd/:id", async(req, res)=>{
    var producto = await buscarPorIDPro(req.params.id);
    res.render("usuarios/infoProduct",{producto});
});

module.exports= rutaUsu;