var rutaUsu = require("express").Router();
var fs = require("fs");
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
const { log } = require("console");


/*COMIENZO DE DEFINICION DE RUTAS----------------------
------------------------------------------------------------------
--------------------------------------------------------------------------* */
rutaUsu.get("/perfilUsuario", autorizado, async(req, res)=>{
    var productos = await mostrarProductos();
    var dataUser = await buscarPorUsuario(req.session.usuario);
    var fotoPerfil = dataUser.foto;
    var usuario = req.session.usuario;
    res.render("usuarios/inicioUsuario", {productos, usuario, fotoPerfil});
});

rutaUsu.get("/opciones", (req, res)=>{
    //var usuario = req.session.usuario;
    res.render("usuarios/OpcionesUsuario");
});

rutaUsu.get("/infoProd/:id", async(req, res)=>{
    var producto = await buscarPorIDPro(req.params.id);
    var dataUser = await buscarPorUsuario(req.session.usuario);
    var fotoPerfil = dataUser.foto;
    var usuario = req.session.usuario;
    res.render("usuarios/infoProduct",{producto, usuario, fotoPerfil});
});

rutaUsu.get("/profileUser", async(req, res)=>{
    var dataUser = await buscarPorUsuario(req.session.usuario);
    var fotoPerfil = dataUser.foto;
    var nombre = dataUser.nombre;
    var password = req.session.password;
    var usuario = req.session.usuario;
    res.render("usuarios/perfilUsuario", {usuario, fotoPerfil, nombre, password, dataUser});
});

rutaUsu.post("/editarDatos", subirArchivo(), async (req, res) => {
    var user = await buscarPorUsuario(req.session.usuario);
    try {
      const usuarioAct = await buscarPorID(user.id);
      if (req.file) {
        req.body.foto = req.file.originalname;
        if (usuarioAct.foto) {
          const rutaFotoAnterior = `public/uploads/${usuarioAct.foto}`;
          fs.unlinkSync(rutaFotoAnterior);
        }
      } else {
        req.body.foto = req.body.fotoVieja;   
      }
      await modificarUsuario(req.body);
      res.redirect("/perfilUsuario");
    } catch (error) {
      console.error("Error al editar pr:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

module.exports= rutaUsu;