var rutaLogin = require("express").Router();
var subirArchivos = require("../middlewares/subirArchivo");
const {
    buscarPorUsuario,
    verificarPassword,
    nuevoUsuario
} = require("../database/usuariosBD");

const {
    encriptarPassword,
    autorizado,
    admin
} = require("../middlewares/funcionesPassword");



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
    const { salt, hash } = encriptarPassword(req.body.password);
    req.body.password = hash;
    req.body.salt = salt;
    var error = await nuevoUsuario(req.body);
    res.redirect("/");
});

//RUTA PARA VALIDAR EL ACCESO A LOS USUARIOS--------------------------------------
rutaLogin.post("/validar", async (req, res) => {
    var { usuario, password } = req.body;
    var usuarioEncontrado = await buscarPorUsuario(usuario);
    if (usuarioEncontrado) {
      var resultado = await verificarPassword(
        password,
        usuarioEncontrado.password,
        usuarioEncontrado.salt
      );
      if (resultado) {
        if (usuarioEncontrado.admin) {
          req.session.admin = req.body.usuario; 
          res.redirect("/perfilADM");
        }else{
          req.session.usuario = req.body.usuario; 
          res.redirect("/perfilUsu");
        }
      } else {
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
  
  // Ruta para mostrar las propiedades del usuario
  // rutaLogin.get("/mostrarPropiedadesUsr", async (req, res) => {
  //   if(req.session.usuario == null){
  //     res.render("login/login", { mensaje: "No has iniciado sesion" });
  //   }else{
  //   try {
  //     // Lógica para obtener el usuario
  //     var usuarioEncontrado = await buscarPorUsuario(req.body.usuario); // Asegúrate de pasar el usuario o su identificación aquí
  //     console.log("usuario: ", usuarioEncontrado);
  //     res.render("login/mostrarPropiedadesUsr", { usuario: usuarioEncontrado }); // Pasa el usuario a la plantilla
  //   } catch (error) {
  //     console.log("Error al obtener el usuario: " + error);
  //     res.render("error", { error: "Error al obtener el usuario" }); // Manejo de errores
  //   }
  // }
  // });
  
module.exports = rutaLogin;