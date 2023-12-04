var multer = require('multer');

function añadirAlCarrito(req, res, next) {
  var storage = multer.diskStorage({
    destination: './public/productsList',
    filename: function(req, file, cb) {
      var archivo = file.originalname;
      cb(null, archivo);
    }
  });
  var upload = multer({ storage }).single('foto');
  return upload;
}

module.exports = añadirAlCarrito;