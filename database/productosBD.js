var conexion = require("./conexionPro");
var Producto = require("../models/Productos");

async function mostrarInventario() {
  var productos = [];
  try {
    var productosObtenidos = await conexion.get();
    if (productosObtenidos) {
      productosObtenidos.forEach((producto) => {
        var productoInstancia = new Producto(producto.id, producto.data());
        if (productoInstancia.bandera == 0) {
          productos.push(productoInstancia.obtenerData);
        }
      });
    }
  } catch (err) {
    console.log("Error al recuperar productos en la base de datos" + err);
  }
  return productos;
}

//-----------------------------------------------APARTADO DE CONTROL DE REGISTRO Y VISUALIZACION------------
/*ESTA FUNCION SOLO SE IMPLEMENTA DEL LADO DEL CLIENTE MIENTRAS QUE DEL LADO DE LOS ADMINISTRADORES
SE IMPLEMENTA LA FUNCION DE MOSTRAR INVENTARIO*/

var productos = [];//VARIABLE DECLARADA DE FORMA GLOBAL PA QUE JALE XD
function processProducts(index, filterProducts) {
  if (index < productos.length) {
    var productoInstancia = new Producto(
      productos[index].id,
      productos[index].data()
    );
    if (productoInstancia.bandera == 0 && productoInstancia.status != "0") {
      filterProducts.push(productoInstancia.obtenerData); // Reemplazamos en lugar de agregar
    }
    processProducts(index + 1, filterProducts);
  }
}
/*la funcion processProducts sirve para evitar errores de apilacion al momento de itarar en lo
que era el forEach, esto me permite realizar un filtro en los registros para solo mostrar aquellos
que tengan el estado de 0, creo que podria mejorarse*/
async function mostrarProductos() {
  return new Promise(async (resolve, reject) => {
    try {
      var productsOK = await conexion.get();
      if (productsOK) {
        productos = productsOK.docs; // Inicializamos con los documentos obtenidos
        
        var productosFiltrados = [];
        processProducts(0, productosFiltrados);

        resolve(productosFiltrados);
      }
    } catch (err) {
      console.log("Error al recuperar información en la base de datos" + err);
      reject(err);
    }
  });
}


async function nuevoProducto(datos) {
  var producto = new Producto(null, datos);
  var error = 1;
  if (producto && producto.bandera == 0) {
    try {
      await conexion.doc().set(producto.obtenerData);
      console.log("Producto insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo producto" + err);
    }
  }
  return error;
}

async function buscarPorIDPro(id) {
  var producto = null; //inicio la variable producto
  try {
    var productoDoc = await conexion.doc(id).get(); //busca el producto por id
    if (productoDoc.exists) {
      producto = new Producto(productoDoc.id, productoDoc.data());  //si lo encuentra 
      if (producto.bandera == 0) { //si el producto existe y no esta vacio lo retorna
        producto = producto.obtenerData; //retorna el producto
      }
    }
  } catch (err) {
    console.log("Error al recuperar al producto" + err); //si no lo encuentra
  }
  return producto; // retonrna si no encuentra nada
}

async function nuevoProducto(datos) {
  var producto = new Producto(null, datos);
  var error = 1;
  if (producto.bandera == 0) {
    try {
      await conexion.doc().set(producto.obtenerData);
      console.log("Producto insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo producto" + err);
    }
  }
  return error;
}

async function modificarProducto(datos) {
  var productoBuscar = await buscarPorIDPro(datos.id);
  if (productoBuscar != "") {
    var producto = new Producto(datos.id, datos);
    var error = 1;
    if (producto.bandera == 0) {
      try {
        await conexion.doc(producto.id).update(producto.obtenerData);
        console.log("Producto actualizado en la BD");
        error = 0;
      } catch (err) {
        console.log("Error al actualizar producto" + err);
      }
    }
  }
  return error;
}

async function borrarProducto(id) {
  var error = 1;
  var producto = await buscarPorIDPro(id); //busca el producto por id
  
  if (producto !== null && Object.keys(producto).length > 0) { //si el producto existe y no esta vacio lo borra
    try {
      await conexion.doc(id).delete();
      console.log("Producto eliminado de la BD");  //si lo encuentra
      error = 0;
    } catch (err) {
      console.log("Error al eliminar producto" + err); //si no lo encuentra
    }
  } else {
    console.log("Producto no encontrado"); //si no lo encuentra
  }
  
  return error; //retorna si no encuentra nada
}


module.exports = {
  mostrarProductos,
  buscarPorIDPro,
  nuevoProducto,
  modificarProducto,
  borrarProducto,
  mostrarInventario
};