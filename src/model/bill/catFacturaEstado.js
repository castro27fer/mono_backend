const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class catBillState extends Model{};

catBillState.init({
    FacturaEstadoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Descripcion: {
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

module.exports = catBillState;