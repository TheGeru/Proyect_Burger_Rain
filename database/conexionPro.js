var admin = require("firebase-admin"); 
var keys2 = require("../serviceAcountKeys.json"); 


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(keys2),
        appName: 'productosBD'
    });
 }else {
    admin.app();
 } 

var db = admin.firestore();
var conexionProBD = db.collection("productosBD");  
module.exports = conexionProBD;  