var conexion = require("./conexionUsu");
var Usuario = require("../models/Usuario");
var crypto = require("crypto");

var {
  encriptarPassword,
} = require("../middlewares/funcionesPassword");
const { log } = require("console");

async function mostrarUsuarios() {
  var users = [];
  try {
    var usuarios = await conexion.get();
    usuarios.forEach((usuario) => {
      var user = new Usuario(usuario.id, usuario.data());
      
      if (user.bandera == 0) {
        users.push(user.obtenerData);
      }
    });
  } catch (err) {
    console.log(
      "Error al recuperar usuarios en la base de datos DE USUARIOS" + err
    );
  }
  return users;
}

async function buscarPorID(id) {
  var user = "";
  try {
    var usuario = await conexion.doc(id).get();
    var usuarioObjeto = new Usuario(usuario.id, usuario.data());
    if (usuarioObjeto.bandera == 0) {
      user = usuarioObjeto.obtenerData;
    }
  } catch (err) {
    console.log("Error al recuperar al usuario " + err);
  }
  return user;
}

async function nuevoUsuario(datos) {
  var { hash, salt } = encriptarPassword(datos.password);
  datos.password = hash;
  datos.salt = salt;
  datos.admin = false;
  var user = new Usuario(null, datos);
  var error = 1;
  if (user.bandera == 0) {
    try {
      await conexion.doc().set(user.obtenerData);
      console.log("Usuario insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo usuario" + err);
      error = 1;
    }
  }
  return error;
}

async function modificarUsuario(datos) {
  console.log("Datos recibidos", datos);
  var error = 1;
  var respuestaBuscar = await buscarPorID(datos.id);
  if (respuestaBuscar != "") {
    if(datos.password == ""){
      datos.password=datos.passwordViejo;
      datos.salt=datos.saltViejo;
    }
    else{
      var {salt, hash}=encriptarPassword(datos.password);
      datos.password=hash;
      datos.salt=salt;
    }
    var user = new Usuario(datos.id, datos);
    if (user.bandera == 0) {
      try {
        await conexion.doc(user.id).set(user.obtenerDatos);
        console.log("Modificado");
        error = 0;
      } catch (err) {
        console.log("Error al modificar usuario: " + err);
      }
    }
  }
  return error;
}

async function borrarUsuario(id) {
  var error = 1;
  var user = await buscarPorID(id);
  if (user != "") {
    try {
      await conexion.doc(id).delete();
      console.log("Registro borrado");
      error = 0;
    } catch (err) {
      console.log("Error al borrar usuario" + err);
    }
  }
  return error;
}

async function buscarPorUsuario(usuario) {
  var user = null; // aqui inicializamos el valor del usuario encontrado como null
  try {
    var usuarios = await conexion.where("usuario", "==", usuario).get();
    usuarios.forEach((usuario) => {
      var usuarioObjeto = new Usuario(usuario.id, usuario.data());
      console.log("id " + usuarioObjeto.id);
      if (usuarioObjeto && usuarioObjeto.bandera === 0) {
        user = usuarioObjeto.obtenerData; 
      }
    });
  } catch (err) {
    console.log("Error al recuperar el usuario: " + err);
  }
  return user;
}
async function verificarPassword(password, hash, salt) {
  try {
     if (typeof salt !== "string") {
       throw new Error("Salt debe ser una cadena");
     }
     var hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, {outputKey: "sha512"}).toString("hex");
 
     // Uso de comparación estricta (===)
     if (hashEvaluar === hash) {
       console.log("Las contraseñas coinciden");
       return true;
     }
 
     console.log("Las contraseñas no coinciden");
     return false;
  } catch (err) {
     console.error("Error al verificar la contraseña:", err);
     return false;
  }
 }




module.exports = {
  mostrarUsuarios,
  buscarPorID,
  nuevoUsuario,
  modificarUsuario,
  borrarUsuario,
  buscarPorUsuario,
  verificarPassword,
};