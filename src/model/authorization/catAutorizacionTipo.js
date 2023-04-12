

const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class AutorizacionTipo extends Model{};

AutorizacionTipo.init({
    AutorizacionTipoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo descripción no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo descripción no puede estar vacío."
            }
        }
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

module.exports = AutorizacionTipo;