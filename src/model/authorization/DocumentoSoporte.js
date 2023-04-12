const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class documentSoport extends Model{};

documentSoport.init({
    DocSoporteId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AutorizacionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Extension: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Documento: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    UsuarioId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EntidadId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CargoId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false
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

module.exports = documentSoport;