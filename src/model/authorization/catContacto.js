const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class catContact extends Model{};

catContact.init({
    ContactoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DependenciaId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    NombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Extension: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Celular: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    CorreoOpcional: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
        
    },
    
},{
    sequelize,
    schema:"authorization"
});

module.exports = catContact;