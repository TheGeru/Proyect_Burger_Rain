var rutaLogin = require("express").Router();
var subirArchivos = require("../middlewares/subirArchivo");
const {
    buscarPorUsuario,
    verificarPassword,
    nuevoUsuario,
    buscarPorID
} = require("../database/usuariosBD");

/*COMIENZO DE LA DEINICION DE RUTAS--------------------------------
...................................................................................
......................................................:).......................... 
*/

/*Defininimos la ruta de INICIO*/
rutaLogin.get("/", (req, res)=>{
    res.render("Login/login");
});

//RUTA QUE RENDERIZA LA PLANTILLA DEL REGISTRO---------------------------------------
rutaLogin.get("/registrar", async(req, res)=>{
    res.render("Login/registrarse");
});

//RUTA QUE PROCESA EL REGISTRO---------------------------------------------
rutaLogin.post("/registrarseENV", subirArchivos(), async(req, res) =>{
    req.body.foto = req.file.originalname;
    var error = await nuevoUsuario(req.body);
    console.log(error);
    res.redirect("/");
});


//RUTA PARA VALIDAR EL ACCESO A LOS USUARIOS--------------------------------------
rutaLogin.post("/validar", async (req, res) => {
    var { usuario, password } = req.body;
    var usuarioEncontrado = await buscarPorUsuario(usuario);
    if (usuarioEncontrado) {
      var resultado = await verificarPassword(password, usuarioEncontrado.password, usuarioEncontrado.salt);
      if (resultado) {
        if (usuarioEncontrado.admin) {
          req.session.admin = req.body.usuario;
          res.redirect("/perfilADM");
        }else{
          req.session.usuario = req.body.usuario; 
          res.redirect("/perfilUsuario");
        }
      } else {
        console.log("no entro");
        res.render("Login/login", { mensaje: "La contraseña que ingresaste : "+password+" es incorecta " });
      }
    } else {
      res.render("Login/login", { mensaje: "El usuario ; "+usuario+" no existe"});
    }
  });
  
  //DESLOGUEARSE
  rutaLogin.get("/logout", async (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  
module.exports = rutaLogin;