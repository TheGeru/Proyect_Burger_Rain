var rutaAdm = require("express").Router();
var subirArchivos = require("../middlewares/subirArchivo");
var subirProductos = require("../middlewares/subirProductos");
var fs = require("fs");
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
    buscarPorIDPro,
    modificarProducto,
    borrarProducto,
    nuevoProducto
} = require("../database/productosBD");

/*COMIENZA DEFINICION DE RUTAS-------------------------------------------
-------------------------------------------------------------------------------
-----------------------------------------------------------------------------------* */

//RENDERIZADO DE LA PLANTILLA DE ADMIN
rutaAdm.get("/perfilADM", async(req, res)=>{
    var productos = await mostrarProductos();
    res.render("admins/inicioAdmin", {productos});
});

rutaAdm.get("/mostrarUsuarios", autorizado, async(req, res)=>{
    try {
        // Lógica para obtener los usuarios
        var usuarios = await mostrarUsuarios();
        res.render("admins/usuariosAdmin", { usuarios: usuarios }); // Pasa los usuarios a la plantilla
      } catch (error) {
        console.log("Error al obtener usuarios: " + error);
        res.render("Login/login");
      }
});

rutaAdm.get("/nuevoProducto", (req, res)=>{
    res.render("admins/nuevoProducto");
});

rutaAdm.post("/guardarProducto", subirProductos(),async(req, res)=>{
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/perfilADM");
});

rutaAdm.get("/productos/borrar/:id", async (req, res) => {
    var producto = await buscarPorIDPro(req.params.id); // pordia ser await borrarUsuario(req.params.id);
    res.render("productos/eliminarPro", { producto }); // res.redirect("/");
  });
  
  rutaAdm.post("/productos/borrar", async (req, res) => {
    const productId = req.body.id; // Accede al id desde req.body
    console.log(productId);
  
    try {
      const product = await buscarPorIDPro(productId);
  
      if (req.file) {
        req.body.foto = req.file.originalname;
      } else {
        req.body.foto = product.foto; // Mantener la foto existente
      }
  
      if (!product) {
        return res.status(404).send("No se encontró el producto");
      }
  
      await fs.unlink(`./public/uploadsProducts/${product.foto}`);
      await borrarProducto(productId);
      error = 0;
  
      res.redirect("/productos/productos");
    } catch (error) {
      console.error("Error al borrar el producto o usuario:", error);
      res.status(500).send("Error al borrar el producto o usuario");
    }
  });

module.exports= rutaAdm;