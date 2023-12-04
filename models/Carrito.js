class ShopingCar {
    constructor(id, datos, idUsuario){
        this.id = id;
        this.ID_usuario = idUsuario;
        this.ID_producto = datos.id;
        this.nombre = datos.nombre;
        this.descripcion = datos.descripcion;
        this.foto = datos.foto;
        this.total = datos.precio;
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
    set ID_usuario(ID_usuario){
        ID_usuario.length > 0 ? (this._ID_usuario = idUsuario) : (this.bandera = 1);
    }
    set ID_producto(ID_producto){
        ID_producto.length > 0 ? (this._ID_producto = ID_producto) : (this.bandera);
    }
    set descripcion(descripcion){
        descripcion.length > 0 ? (this._descripcion = descripcion) : (this.bandera = 1);
    }
    set foto(foto) {
        foto.length > 0 ? this._foto = foto : this.bandera = 1; // Si la foto es mayor a 0, se asigna a la propiedad _foto, si no, se asigna 1 a la propiedad bandera
      }
    set total(total){
        total.length > 0 ? (this._total = precio) : (this.bandera = 1);
    }

    get id() {
        return this._id;
    }
    get ID_usuario() {
        return this._ID_usuario;
    }
    get ID_producto(){
        return this._ID_producto;
    }
    get descripcion(){
        return this._descripcion;
    }
    get foto() {
        return this._foto;  // Se retorna el valor de la propiedad _foto
    }
    get total(){
        return this._total;
    }
    get obtenerData() {
        if (this._id != null) {
          return {
            id: this.id,
            ID_usuario: this.ID_usuario,
            ID_producto: this.ID_producto,
            nombre: this.nombre,
            descripcion: this._descripcion,
            foto: this.foto,
            total: this.total,
          };
        } else {
          return {
            ID_usuario: this.ID_usuario,
            ID_producto: this.ID_producto,
            nombre: this.nombre,
            descripcion: this._descripcion,
            foto: this.foto,
            total: this.total,
          };
        }
    }
}