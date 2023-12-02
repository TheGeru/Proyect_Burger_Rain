var rutaAdm = require("express").Router();
var subirArchivos = require("../middlewares/subirArchivo");
var subirProductos = require("../middlewares/subirProductos");
const fs = require("fs").promises;
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
    buscarPorIDPro,
    modificarProducto,
    borrarProducto,
    nuevoProducto,
    mostrarInventario
} = require("../database/productosBD");


/*---- --- A PARTIR DE AQUI COMIENZA LA DEFINICION DE RUTAS-------------------------------------------
-------------------------------------------------------------------------------
-----------------------------------------------------------------------------------* */

//RENDERIZADO DE LA PLANTILLA DE ADMIN
rutaAdm.get("/perfilADM", autorizado, async(req, res)=>{
    var productos = await mostrarInventario();
    var usuario=req.session.admin;
    var foto = await encontrarFoto(usuario);
    res.render("admins/inicioAdmin", {productos, usuario, foto});
});

rutaAdm.get("/mostrarUsuarios", autorizado, async(req, res)=>{
    try {
        // Lógica para obtener los usuarios
        var usuarios = await mostrarUsuarios();
        var usuario=req.session.admin;
        res.render("admins/usuariosAdmin", { usuarios, usuario }); // Pasa los usuarios a la plantilla
      } catch (error) {
        console.log("Error al obtener usuarios: " + error);
        res.render("Login/login");
      }
});

//RUTAS PARA OPCIONES DE REGISTRAR NUEVO PRODUCTO-------------------------------------
rutaAdm.get("/nuevoProducto", autorizado, async(req, res)=>{
  var usuario=req.session.admin;
  var foto = encontrarFoto(usuario);
    res.render("admins/nuevoProducto", {usuario, foto});
});

rutaAdm.post("/guardarProducto", subirProductos(),async(req, res)=>{
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/perfilADM");
});

//------RUTAS PARA OPCIONES DE BORRADO-------------------------------------------------
rutaAdm.get("/borrarPr/:id/:usuario", async (req, res) => {
    var producto = await buscarPorIDPro(req.params.id);
    console.log(producto);
    var usuario=req.session.admin;
    res.render("admins/opBorrado", { producto, usuario }); // res.redirect("/");
  });
  
  rutaAdm.post("/borrarDef", async (req, res) => {
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
  
      res.redirect("/perfilADM");
    } catch (error) {
      console.error("Error al borrar el producto o usuario:", error);
      res.status(500).send("Error al borrar el producto o usuario");
    }
  });

  //RUTAS PARA LAS OPCIONES DE EDITAR--------------------------------------------
  rutaAdm.get("/editarPR/:id", async (req, res) => {
    var usuario = req.session.admin;
    var producto = await buscarPorIDPro(req.params.id);
    res.render("admins/editarProduct", { producto, usuario });
  });

  rutaAdm.post("/enviarMod", subirProductos(), async (req, res) => {
    var producto = await buscarPorIDPro(req.body.id); // Obtener el usuario antes del if
    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = producto.foto; // Mantener la foto existente
    }
    console.log(req.body.foto);
    var error = await modificarProducto(req.body);
    res.redirect("/perfilADM");
  });

module.exports= rutaAdm;