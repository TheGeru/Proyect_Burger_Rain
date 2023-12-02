class Producto {
    constructor(id, datos) {
      this.id = id;
      this.nombre = datos.nombre;
      this.precio = datos.precio;
      this.descripcion = datos.descripcion;
      this.foto = datos.foto;
      this.status = datos.status;
      this.bandera = 0;
    }
    set id(id) {
      if (id != null) {
        id.length > 0 ? (this._id = id) : (this.bandera = 1);
      }
    }
    set nombre(nombre) {
      nombre.length > 0 ? (this._nombre = nombre) : (this.bandera = 1);
    }
    set precio(precio) {
      precio.length > 0 ? (this._precio = precio) : (this.bandera = 1);
    }
    set descripcion(descripcion) {
      descripcion.length > 0 ? (this._descripcion = descripcion): (this.bandera = 1);
    }
    set foto(foto) {
      foto.length > 0 ? this._foto = foto : this.bandera = 1; // Si la foto es mayor a 0, se asigna a la propiedad _foto, si no, se asigna 1 a la propiedad bandera
    }
    set status(status){
      status.length > 0 ? this._status = status: this.bandera = 1;
    }

    get id() {
      return this._id;
    }
    get nombre() {
      return this._nombre;
    }
    get precio() {
      return this._precio;
    }
    get descripcion(){
      return this._descripcion;
    }
    get foto() {
      return this._foto;  // Se retorna el valor de la propiedad _foto
    }
    get status(){
      return this._status;
    }

    get obtenerData() {
      if (this._id != null) {
        return {
          id: this.id,
          nombre: this.nombre,
          precio: this.precio,
          foto: this.foto,
          descripcion: this._descripcion,
          status: this._status
        };
      } else {
        return {
          nombre: this.nombre,
          precio: this.precio,
          foto: this.foto,
          descripcion: this._descripcion,
          status: this._status
        };
      }
    }
  }
  
  module.exports = Producto;