class Usuario {
    constructor(id, data) { // Constructor de la clase con password para modificar usuario sin cambiar la contraseña
        this.bandera = 0; // Propiedades de la clase
        this._id = id;  // Propiedades de la clase
        this._nombre = data.nombre;  // Propiedades de la clase
        this._usuario = data.usuario;  // Propiedades de la clase
        this._password = data.password;  // Propiedades de la clase
        this._salt = data.salt;  // Propiedades de la clase
        this._foto = data.foto;  // Propiedades de la clase
        this._admin = data.admin  // Propiedades de la clase
    }
    // Metodos de la clase
    set id(value) {
        if (value != null) {
            value.length > 0 ? this._id = value : this.bandera = 1;
        }
    }
    set nombre(value) {
        value.length > 0 ? this._nombre = value : this.bandera = 1;
    }
    
    set usuario(value) {
        value.length > 0 ? this._usuario = value : this.bandera = 1;
    }

    set password(value) {
        value.length > 0 ? this._password = value : this.bandera = 1;
    }
    
    set salt(value) {
        value.length > 0 ? this._salt = value : this.bandera = 1;
    }
    
    set foto(value) {
        value.length > 0 ? this._foto = foto : this.bandera = 1;
    }
    set admin(value) {
        this._admin = admin;
    }
    /*RETORNAMOS LOS VALORES ------------------------------------------* */
    get id() {
    return this._id; 
    }
    get nombre() {
    return this._nombre; 
    }
    get usuario() {
    return this._usuario;  
    }
    get password() {
    return this._password;  
    }
    get salt() {
    return this._salt;  
    }
    get foto() {
    return this._foto;  
    }
    get admin() {
    return this._admin; 
    }
    get obtenerData(){
        if(this._id !=null)
        return {
            id: this.id, 
            nombre: this.nombre,  
            usuario: this.usuario, 
            password: this.password,  
            salt: this.salt,  
            foto: this.foto, 
            admin: this.admin
        }
        else{
            return {
                nombre: this.nombre,  
                usuario: this.usuario,
                password: this.password,  
                salt: this.salt,
                foto: this.foto,
                admin: this.admin
            }
        }
        
    }
    
}

module.exports = Usuario;