const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
const catDependency = require("./catDependencia.js");
class catContact extends Model{};

catContact.init({
    ContactoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DependenciaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ExpEmpleado_ID: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Extencion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Celular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CorreoOpcional: {
        type: DataTypes.STRING,
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


catContact.hasOne(catDependency, { foreignKey: "DependenciaId" });
module.exports = catContact;