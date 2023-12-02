var rutaUsu = require("express").Router();
var subirArchivo = require("../middlewares/subirArchivo");
const{
    buscarPorID,
    buscarPorUsuario,
    borrarUsuario,
    mostrarUsuarios,
    modificarUsuario,
    verificarPassword,
    encontrarFoto
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
rutaUsu.get("/perfilUsuario", autorizado, async(req, res)=>{
    var productos = await mostrarProductos();
    var usuario = req.session.usuario;
    var fotoPerfil = req.session.foto;
    console.log(fotoPerfil);
    res.render("usuarios/inicioUsuario", {productos, usuario, fotoPerfil});
});

rutaUsu.get("/opciones", (req, res)=>{
    //var usuario = req.session.usuario;
    res.render("usuarios/OpcionesUsuario");
});

rutaUsu.get("/infoProd/:id", async(req, res)=>{
    var producto = await buscarPorIDPro(req.params.id);
    console.log("datos obtenidos: ", producto);
    var usuario = req.session.usuario;
    res.render("usuarios/infoProduct",{producto, usuario});
});

rutaUsu.get("/profileUser", async(req, res)=>{

});

module.exports= rutaUsu;