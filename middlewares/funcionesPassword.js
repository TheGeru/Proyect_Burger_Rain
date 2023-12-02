const { log } = require('console');
var crypto = require('crypto');

function encriptarPassword(password) {
  try {
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return {
      salt,
      hash
    };
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    throw error;
  }
}

function compararPassword(password, hash, salt) {
    var hashEvaluar = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hashEvaluar === hash;
};

function autorizado(req, res, cb) {
    if (req.session.usuario || req.session.admin) {
      cb();
    } else {
        res.render("login/login", { mensaje: "No has iniciado sesion" });
    }
  };

function admin(req, res, cb) {
    if (req.session.admin) cb();
    else res.render("login/login", { mensaje: "No has iniciado sesion" });

  };

module.exports = {
    encriptarPassword,
    compararPassword,
    autorizado,
    admin
}