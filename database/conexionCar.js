var admin = require("firebase-admin");
var keys3 = require("../serviceAcountKeys.json");

if(!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert(keys3),
        appName: 'carritoDecompras'
    });
} else {
    admin.app();
}

var db = admin.firestore();
var conexionCar = db.collection("carritoDecompras");
module.exports = conexionCar;