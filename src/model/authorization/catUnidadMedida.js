const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class catUnitMeasurement extends Model{};

catUnitMeasurement.init({
    UnidadMedidaId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
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

module.exports = catUnitMeasurement;