var admin = require("firebase-admin");  // para usar firebase

var keys = require("../serviceAcountKeys.json");  // para usar las credenciales de firebase

admin.initializeApp({
    credential: admin.credential.cert(keys),  // para usar las credenciales de firebase
    appName: 'miejemploBD'
});

var db = admin.firestore();  // para usar firestore

var conexion = db.collection("miejemploBD");  // para usar la coleccion de la base de datos
// var conexionProductos = db.collection("productosDB");  // para usar la coleccion de la base de datos

module.exports = conexion;  // para exportar la conexion
